const app = {};

app.flag = true;

app.middleValue = {};

app.toggleBtn = function() {
    if(app.flag) {
        $('#add-todo').show();
        $('#edit-todo').hide();
    } else {
        $('#add-todo').hide();
        $('#edit-todo').show();
    }
}
app.Task = Backbone.Model.extend({
    defaults: {
        name: 'go to bed'
    }
});

app.Tasks = Backbone.Collection.extend( {
    model: app.Task
});

app.View = Backbone.View.extend({
    tagName: 'li',
    events: {
        'click #edit': 'edit',
        'click #remove': 'remove'
    },
    remove() {
        app.middleValue = this.model;
    },
    edit() {
        app.flag = false;
        app.toggleBtn();
        app.middleValue = this.model;
    },
    template: _.template($('#todo-tmpl').html()),
    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
app.Views = Backbone.View.extend({
    el: '.container',
    initialize() {
        this.render();
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
    },
    events: {
        'click #add-todo': 'addTodo',
        'click #edit-todo': 'editTodo',
        'click #remove': 'remove'
    },
    remove() {
        this.collection.remove(app.middleValue);
    },
    editTodo() {
        let value = $('#input-task').val();
        let middleValue = app.middleValue.toJSON();
        let index;
        let myArr = this.collection.toJSON();
        if(value) {
            myArr.forEach(function(item, i) {
                if(item.name === middleValue.name) {
                    index = i;
                }
            })
            myArr[index]= {name: value};
            let myColl = new app.Tasks(myArr);
            let myViews = new app.Views({collection: myColl});
            app.flag = true;
            app.toggleBtn();
            $('#input-task').val('');
        } else {
            return;
        } 
    },
    addTodo() {
        let value = $('#input-task').val();
        if(value) {
            this.collection.add({name: value});
            $('#input-task').val('');
        } else {
            return;
        }
    },
    render() {
        app.toggleBtn();
        this.$el.find('ul').empty();
        this.collection.each(function(item) {
            let mview = new app.View({model: item});
            this.$el.find('ul').append(mview.render().el);
        }, this);
        return this;
    }
})
var tasks = new app.Tasks([{name: 'go to work'}]);
var views = new app.Views({collection: tasks});

