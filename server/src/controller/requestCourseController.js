const utils = require('../utils/utils');
const RequestCourseService = require('../service/requestCourseService');

class RequestCourseController {
  async getAll(request, response) {
    try {
      const requestCourse = await RequestCourseService.getAll();
      
      response.status(200).json({ ok: true, message: requestCourse});
    } catch (error) {
      response.status(500).json({ ok: false, error: 'Error fetching requestCourse' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const requestCourse = await RequestCourseService.getById(id);
      
      if (!requestCourse) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: requestCourse});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { title, id_headquarter, duration, mode, availableSchedule, id_user, reason, created_at } = request.body
      console.log(title)
      const object = {
        title: title,
        id_headquarter: id_headquarter.id,
        duration: duration,
        mode: mode,
        availableSchedule: availableSchedule,
        id_user: id_user.id,
        reason: reason,
        created_at: utils.getCurrentUTCTimeZone()
      }
      const requestCourse = await RequestCourseService.create(object);

      response.status(200).json({ ok: true, message: requestCourse});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const requestCourse = await RequestCourseService.update(id, body);

      if (!requestCourse) {
        response.status(404).json({ ok: false, error: 'Solicitud de curso no encontrada' });
      }

      response.status(200).json({ ok: true, message: requestCourse });
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const requestCourse = await RequestCourseService.getById(id)

      if (!requestCourse) {
        response.status(404).json({ ok: false, error: 'Solicitud de curso no encontrada' });
      }

      await RequestCourseService.delete(id);

      res.status(200).json({ ok: true, message: requestCourse});
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new RequestCourseController();