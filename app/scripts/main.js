
// (function($){

//MODEL
  var Task = Backbone.Model.extend({
    defaults: function(){
      return {
        todo: '',
        done: false,
        _id: ''
      };
    }

  });

var task = new Task();

//COLLECTION
  var TaskList = Backbone.Collection.extend({
    model: Task,
    url: "http://tiny-pizza-server.herokuapp.com/collections/examples"
  });

  var taskList = new TaskList();

  // taskList.add([
  //   {
  //     todo: 'go to the store'
  //   }
  // ]);
  // taskList.add([
  //   {
  //     todo: 'meet up with Dave'
  //   }
  // ]);
  // taskList.add([
  //   {
  //     todo: 'pet Bella'
  //   }
  // ]);

//VIEW
  var TaskView = Backbone.View.extend({
    model: new Task,
    tagName: 'p',
    // template: $('#todo-list').html(),

    // initialize: function(){
    //   this.template = $('#todo-list').html();
    // },
    initialize: function(){
      this.listenTo(this.collection, 'all', this.render);
    },

    render: function(){
      // this.$el.html(this.template(this.model.toJSON()));
      var source = $('#todo-list').html();
      var template = Handlebars.compile(source);
      var rendered = template({taskList: this.collection.toJSON()})
      this.$el.html(rendered);
      return this;
    }
    // this.listenTo(this.model, "change", this.render);

    // // If you hit enter its done editing the item.
    // updateOnEnter: function(e) {
    //   if (e.keyCode == 13) this.close();
    // },
    // // Remove the item, destroy the model.
    // clear: function() {
    //   this.model.clear();
    // }

  });

  var taskView = new TaskView({
    collection: taskList
  })

  var TasksView = Backbone.View.extend({
    model: taskList,
    el: $('#todo-container'),
  });

// })(jQuery);

$(document).ready(function(){
  $('#todo-container').append(taskView.render().$el);
  $('#list').submit(function(ev){
      var task = new Task({todo: $('#new-todo').val()});
      taskList.add(task);
      console.log(taskList.toJSON());
      return false;
    });
})



//for handlebars
// $(function(){
//   var source = $('#todo-list').html();
//   var template = Handlebars.compile(source);
//
//   // var context = {
//   //
//   // };
//   //
//   // var html = template(context);
//   // $(document.body).html(html);
// });
