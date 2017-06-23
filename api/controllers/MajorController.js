/**
 * MajorController
 *
 * @description :: Server-side logic for managing majors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/major";
var view = "manage_majors";

function clean_request_body(request_body){
  return JSON.parse(JSON.stringify(request_body).replace(/\"\"/g, null))
}

module.exports = {

  /**
   * `MajorController.create()`
   */
  create: function (req, res) {

        var args = {
            data: clean_request_body(req.body),
            headers: { "Content-Type": "application/json" }
        };

        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect(view);
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect(view);

        })

  },


  /**
   * `MajorController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view(view, {majors: data});
    }).on('error', function (err) {
        return res.view(view, {error: { message: "There was an error getting the majors"}});
    });

  },


   /**
   * `MajorController.update()`
   */
  update: function (req, res) {

    let majorId = req.body.major_id;
    delete req.body.major_id;

    var args = {
        data: clean_request_body(req.body),
        headers: { "Content-Type": "application/json" }
    };

    client.put(endpoint + "/" + majorId, args, function (data, response) {

      if(response.statusCode != "200"){
          req.addFlash("error", data.message);
          return res.redirect(view);
      }

      req.addFlash("success", "Record updated successfully");
      return res.redirect(view);

    })
  },

  /**
   * `MajorController.delete()`
   */
  delete: function (req, res) {

    client.delete(endpoint + "/" + req.body.major_id, function (data, response) {

      if(response.statusCode != "200"){
          req.addFlash("error", data.message);
      }

      req.addFlash("success", "Record deleted successfully");

      return res.redirect(view);

    })


  }

};
