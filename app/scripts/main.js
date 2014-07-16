//MODEL
  var Task = Backbone.Model.extend({

    defaults: function(){
      return {
      todo: '',
      done: false
      }
    },

    idAttribute: '_id',
    urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/grub',

    toggle: function(){
      this.save({
        done: !this.get('done')
      });
    }

  });

var task = new Task();

//COLLECTION
  var TaskList = Backbone.Collection.extend({
    model: Task,
    url: "http://tiny-pizza-server.herokuapp.com/collections/grub",
    //Puts them in alphabetical order
    comparator: function(collection) {
      return collection.get('todo').toLowerCase();
    },
    // done: function() {
		// 	return this.where({done: true});
		// },
  });

  var taskList = new TaskList();

//VIEW
  var TaskView = Backbone.View.extend({
    model: Task,
    // tagName: 'li',

    events: {
      'click .toggle' : 'toggleDone',
      'click .delete' : 'delete',
      // 'blur .title' : 'close',
      // 'keypress .title' : 'enterSubmit',
      // 'click .edit' : 'edit'
    },

    toggleDone: function(e) {
      var id = $(e.target).parent().attr('id');
      var item = this.collection.get(id)
      item.toggle();
      console.log(item.attributes);
    },

    delete: function(e){
      // var id = $(e.target).parent().attr('id');
      // var item = this.collection.get(id)
      var doneItems = this.collection.where({done: true});
      _.each(doneItems, function (item) {
        item.destroy({success: function (model, response) {
          window.location.reload();
        }});
      })
    },

    // delete: function() {
		// 	_.invoke(taskList.done(), "destroy");
		// 	return false;
		// },

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
    el: '#todo-container'
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

    // $('.todo_list').on('click','.removeTask',function() {
    //   var $this = $(this),
    //     id = $this.data('id'),
    //     todo = todoList.get(id);
    //
    //   $this.parent().remove();
    //
    //   todo.destroy();
    // });
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
