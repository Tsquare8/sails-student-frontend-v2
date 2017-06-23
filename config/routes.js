/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'POST /create_student': 'StudentController.create',
  'GET /manage_students': 'StudentController.read',
  'POST /update_student': 'StudentController.update',
  'POST /delete_student': 'StudentController.delete',

  'POST /create_classes': 'ClassController.create',
  'GET /manage_classes': 'ClassController.read',
  'POST /update_classes': 'ClassController.update',
  'POST /delete_classes': 'ClassController.delete',

  'POST /create_instructor': 'InstructorController.create',
  'GET /manage_instructors': 'InstructorController.read',
  'POST /update_instructor': 'InstructorController.update',
  'POST /delete_instructor': 'InstructorController.delete',

  'POST /create_assignment': 'AssignmentController.create',
  'GET /manage_assignments': 'AssignmentController.read',
  'POST /update_assignment': 'AssignmentController.update',
  'POST /delete_assignment': 'AssignmentController.delete',

  'POST /create_grade': 'GradeController.create',
  'GET /manage_grades': 'GradeController.read',
  'POST /update_grade': 'GradeController.update',
  'POST /delete_grade': 'GradeController.delete',

  'POST /create_major': 'MajorController.create',
  'GET /manage_majors': 'MajorController.read',
  'POST /update_major': 'MajorController.update',
  'POST /delete_major': 'MajorController.delete',

  'POST /create_student_class': 'StudentClassController.create',
  'GET /manage_student_classes': 'StudentClassController.read',
  'POST /update_student_class': 'StudentClassController.update',
  'POST /delete_student_class': 'StudentClassController.delete',

  'POST /create_major_class': 'MajorClassController.create',
  'GET /manage_major_classes': 'MajorClassController.read',
  'POST /update_major_class': 'MajorClassController.update',
  'POST /delete_major_class': 'MajorClassController.delete'

};
