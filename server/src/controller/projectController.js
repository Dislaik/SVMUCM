const ProjectService = require('../service/projectService');
const utils = require('../utils/utils');

class ProjectController {
  async getAll(request, response) {
    try {
      const projects = await ProjectService.getAll();
      
      response.status(200).json({ ok: true, message: projects});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const project = await ProjectService.getById(id)

      if (!project) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: project});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByUserId(request, response) {
    try {
      const { id } = request.params;
      const projects = await ProjectService.getByUserId(id);
      
      
      response.status(200).json({ ok: true, message: projects});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request;
      const projectObject = {
        name: body.name,
        description: body.description,
        id_user: body.id_user.id,
        start_date: body.start_date,
        end_date: body.end_date,
        id_career: body.id_career.id,
        id_city: body.id_city.id,
        id_projectStatus: body.id_projectStatus.id,
        created_at: body.created_at
      }

      const project = await ProjectService.create(projectObject);

      response.status(200).json({ ok: true, message: project});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const projectObject = {
        name: body.name,
        description: body.description,
        id_user: body.id_user.id,
        start_date: body.start_date,
        end_date: body.end_date,
        id_career: body.id_career.id,
        id_city: body.id_city.id,
        id_projectStatus: body.id_projectStatus.id,
        created_at: body.created_at
      }
      console.log(projectObject)
      let project = await ProjectService.update(id, projectObject);

      if (!project) {
        return response.status(404).json({ message: 'Project not found' });
      }

      project.id_user = body.id_user;
      project.id_career = body.id_career;
      project.id_city = body.id_city;
      project.id_projectStatus = body.id_projectStatus;

      response.status(200).json({ ok: true, message: project});
    } catch (error) {
      response.status(500).json({ error: 'Error updating project' });
    }
  }


  //     const userObject = {
  //       username: body.username,
  //       password: password,
  //       email: body.email,
  //       first_name: body.first_name,
  //       last_name: body.last_name,
  //       address: body.address,
  //       phone: body.phone,
  //       image: 'http://localhost:8080/attachments/avatarDefault.png',
  //       id_role: body.id_role.id,
  //       id_user_status: body.id_user_status.id,
  //       created_at: body.created_at
  //     } 

  //     const userUpdate = await userService.update(id, userObject);
  //     if (!userUpdate) {
  //       return response.status(404).json({ ok: false,  error: 'User not found' });
  //     }

  //     return response.status(200).json({ ok: true, message: userUpdate});
  //   } catch (error) {
  //     return response.status(500).json({ error: 'Error updating user' });
  //   }
  // }
  

  async delete(request, response) {
    try {
      const { id } = request.params;
      const project = await ProjectService.getById(id)

      await ProjectService.delete(id);

      res.status(200).json(project);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProjectController();