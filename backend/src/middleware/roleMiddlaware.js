const scrumRoles = {
  productOwner: ['createProject', 'updateProject', 'deleteProject', 'assignRoles'],
  scrumMaster: ['createTask', 'updateTask', 'deleteTask', 'assignRoles'],
  developer: ['viewProject', 'createTask', 'updateTask'],
  designer: ['viewProject', 'createTask', 'updateTask', 'designInterface'],
  analystQA: ['viewProject', 'createTask', 'updateTask', 'testFunctionality'],
  devOpsDeveloper: ['viewProject', 'createTask', 'updateTask', 'deployApplication'],
};

const kanbanRoles = {
  client: ['createProject', 'updateProject', 'deleteProject', 'assignRoles'],
  projectManager: ['createTask', 'updateTask', 'deleteTask', 'assignRoles'],
  developer: ['viewProject', 'createTask', 'updateTask'],
  designer: ['viewProject', 'createTask', 'updateTask', 'designInterface'],
  analystQA: ['viewProject', 'createTask', 'updateTask', 'testFunctionality'],
  devOpsDeveloper: ['viewProject', 'createTask', 'updateTask', 'deployApplication'],
  endUser: ['viewProject'],
};

const leanRoles = {
  client: ['createProject', 'updateProject', 'deleteProject', 'assignRoles'],
  projectManager: ['createTask', 'updateTask', 'deleteTask', 'assignRoles'],
  developer: ['viewProject', 'createTask', 'updateTask'],
  designer: ['viewProject', 'createTask', 'updateTask', 'designInterface'],
  analystQA: ['viewProject', 'createTask', 'updateTask', 'testFunctionality'],
  devOpsDeveloper: ['viewProject', 'createTask', 'updateTask', 'deployApplication'],
  endUser: ['viewProject'],
};

const shapeUpRoles = {
  client: ['createProject', 'updateProject', 'deleteProject', 'assignRoles'],
  projectManager: ['createTask', 'updateTask', 'deleteTask', 'assignRoles'],
  developer: ['viewProject', 'createTask', 'updateTask'],
  designer: ['viewProject', 'createTask', 'updateTask', 'designInterface'],
  analystQA: ['viewProject', 'createTask', 'updateTask', 'testFunctionality'],
  devOpsDeveloper: ['viewProject', 'createTask', 'updateTask', 'deployApplication'],
  endUser: ['viewProject'],
};

const dsdmRoles = {
  executiveSponsor: ['createProject', 'updateProject', 'deleteProject', 'assignRoles'],
  projectManager: ['createTask', 'updateTask', 'deleteTask', 'assignRoles'],
  developer: ['viewProject', 'createTask', 'updateTask'],
  designer: ['viewProject', 'createTask', 'updateTask', 'designInterface'],
  analystQA: ['viewProject', 'createTask', 'updateTask', 'testFunctionality'],
  devOpsDeveloper: ['viewProject', 'createTask', 'updateTask', 'deployApplication'],
  endUser: ['viewProject'],
  businessRepresentative: ['viewProject', 'provideFeedback'],
};

const xpRoles = {
  client: ['createProject', 'updateProject', 'deleteProject', 'assignRoles'],
  developers: ['viewProject', 'createTask', 'updateTask'],
  designer: ['viewProject', 'createTask', 'updateTask', 'designInterface'],
  analystQA: ['viewProject', 'createTask', 'updateTask', 'testFunctionality'],
  devOpsDeveloper: ['viewProject', 'createTask', 'updateTask', 'deployApplication'],
  endUser: ['viewProject'],
  xpCoach: ['viewProject', 'provideGuidance'],
};

function roleMiddleware(roles) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!userRole || !roles[userRole]) {
      return res.status(401).json({ error: 'No tienes permisos suficientes' });
    }

    next();
  };
}

export const scrumRoleMiddleware = roleMiddleware(scrumRoles);
export const kanbanRoleMiddleware = roleMiddleware(kanbanRoles);
export const leanRoleMiddleware = roleMiddleware(leanRoles);
export const shapeUpRoleMiddleware = roleMiddleware(shapeUpRoles);
export const dsdmRoleMiddleware = roleMiddleware(dsdmRoles);
export const xpRoleMiddleware = roleMiddleware(xpRoles);
