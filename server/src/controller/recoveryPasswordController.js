
const RecoveryPasswordService = require('../service/recoveryPasswordService'); // El servicio RecoveryPassword es llamado
const UserService = require('../service/userService'); // El servicio User es llamado
const auth = require('../security/authentication'); // La seguridad de autenticación es llamada
const utils = require('../utils/utils'); // La clase Utils es llamada
const { Resend } = require('resend');

// Controlador de la clase Auth, valida los datos recibidos y realiza actualizaciones y validaciones correspondientes en el modelo User
class RecoveryPasswordController {

  async sendPasswordRecovery(request, response) {
    try {
      const { email } = request.body;
      if (await UserService.existsByEmail(email)) {
        const user = await UserService.getByEmail(email);
        const resend = new Resend('re_GkkreArq_B3wJHsfnPY31StEVZuC3omxP');
        const timestamp = Date.now() + 1000 * 60 * 3; 
        const code = utils.generateRandomNumbers();
        const recoveryPassword = await RecoveryPasswordService.getByUserId(user.id);

        if (recoveryPassword) {
          const object = {
            code: code,
            timestamp: timestamp,
            id_user: user.id,
            created_at: new Date()
          }

          await RecoveryPasswordService.update(recoveryPassword.id, object);
        } else {
          const object = {
            code: code,
            timestamp: timestamp,
            id_user: user.id,
            created_at: new Date()
          }

          await RecoveryPasswordService.create(object);
        }

        resend.emails.send({
          from: 'svmucm@resend.dev',
          to: email,
          subject: 'Recuperación de contraseña',
          html: `
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña. Generamos el siguiente código de verificación:</p>
            <b>${code}</b>
            <p>Si no solicitaste esto, puedes ignorar este correo.</p>
          `,
        });
        

        return response.status(200).json({ ok: true, message: 'Correo de recuperación enviado' });
      }

      return response.status(200).json({ ok: false, message: 'Usuario no encontrado' });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    };
  };

  async sendPasswordRecoveryConfirm(request, response) {
    try {
      const { email, code } = request.body;
      const user = await UserService.getByEmail(email);

      if (user) {
        const recoveryPassword = await RecoveryPasswordService.getByUserId(user.id);
        const timestamp = Date.now();
        
        if (recoveryPassword.timestamp > timestamp) {

          if (recoveryPassword.code === code) {
            const resend = new Resend('re_GkkreArq_B3wJHsfnPY31StEVZuC3omxP');
            const password = utils.generateSecurePassword();
            const passwordCrypted = await auth.cryptPassword(password);
            user.password = passwordCrypted;
            user.id_role = user.id_role.id;
            user.id_user_status = user.id_user_status.id;
            
            await UserService.update(user.id, user);
            
            resend.emails.send({
              from: 'svmucm@resend.dev',
              to: email,
              subject: 'La contraseña de su cuenta ha sido restablecida',
              html: `
                <p>Hola,</p>
                <p>La contraseña de su cuenta ha sido restablecida.</p>
                <b>contraseña: ${password}</b>
              `,
            });

            return response.status(200).json({ ok: true, message: 'Se ha enviado un correo con su contraseña restablecida' });
          }

          return response.status(200).json({ ok: false, message: 'Codigo incorrecto, intentalo nuevamente' });
        }

        return response.status(200).json({ ok: false, message: 'Se ha acabo el tiempo, intentalo nuevamente' });
      }

      return response.status(200).json({ ok: false, message: 'No se ha encontrado al usuario' });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    };
  };
}

module.exports = new RecoveryPasswordController();