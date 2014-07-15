//MODEL
  var Task = Backbone.Model.extend({
    defaults: function(){
      return {
      todo: '',
      done: false
      };
    },
    idAttribute: '_id',
    urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/grub'
  });

var task = new Task();

//COLLECTION
  var TaskList = Backbone.Collection.extend({
    model: Task,
    url: "http://tiny-pizza-server.herokuapp.com/collections/grub"
  });

  var taskList = new TaskList();

//VIEW
  var TaskView = Backbone.View.extend({
    model: Task,
    tagName: 'li',

    events: {
      'click .edit' : 'edit',
      'click .delete' : 'delete',
      'blur .title' : 'close',
      'keypress .title' : 'enterSubmit'
    },

    delete: function(e){
      e.preventDefault();
      this.$('.title').attr('editable', true).focus();
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);
      this.collection.fetch();
    },

    render: function(){
      var source = $('#todo-list').html();
      var template = Handlebars.compile(source);
      var rendered = template({taskList: this.collection.toJSON()})
      this.$el.html(rendered);
      return this;
    }

  });

  var taskView = new TaskView({
    collection: taskList
  })

  var AppView = Backbone.View.extend( {

  });

$(document).ready(function(){
  $('#todo-container').append(taskView.render().$el);
  $('#list').submit(function(ev){
      var task = new Task({todo: $('#new-todo').val()});
      task.save();
      taskList.add(task);
      console.log(taskList.toJSON());
      return false;
    });
})

// if (e.which !== 13 || !this.input.val().trim()) this.close() ){
//   return;
// },

// template: $('#todo-list').html(),

// initialize: function(){
//   this.template = $('#todo-list').html();
// },
// initialize: function(){
//   this.listenTo(this.collection, 'all', this.render);
// },
