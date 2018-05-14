// Определяем массив из объектов на карты парка, которые впоследствии будем выводить
(function ($) {
    var objects = [
        { mapitem: "Парк ДГТУ", describe: "Студенческий парк"},
        { mapitem: "Бассейн ДГТУ", describe: "Бассейн 'Универ'"},
        { mapitem: "Манеж ДГТУ", describe: "Спортивный манеж ДГТУ"},
        { mapitem: "ДГТУ", describe: "Главный корпус"},
        { mapitem: "Храм", describe: "Храм святой мученицы Татианы при ДГТУ"},
        { mapitem: "Памятник", describe: "Памятник студентам и сотрудникам РИСХМ"}
    ];


// Модель представляет собой данные приложения; в нашем приложении это будет
// индивидуальный объект карты парка с атрибутами item и describe
var Objectt = Backbone.Model.extend({
    defaults: {
        empy: "#"
    }
});

// Коллекции представляют собой классы для управления группами моделей
var Directory = Backbone.Collection.extend({
    model: Objectt
});

// Представление будет выводить каждый объект указанный на карте
var ObjecttView = Backbone.View.extend({
    tagName: "article",
    className: "objectt-container",
    template: $("#objecttTemplate").html(),

    // render() используется методом Underscor-ом template() для передачи нужного
    // шаблона. В ответ возвращается метод, который мы можем вызвать,
    // чтобы использовать шаблон
    render: function () {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});

var DirectoryView = Backbone.View.extend({
    el: $("#objects"),

    initialize: function () {
        this.collection = new Directory(objects);
        this.render();
    },

    render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderObjectt(item);
        }, this);
    },

    renderObjectt: function (item) {
        var objecttView = new ObjecttView({
            model: item
        });
        this.$el.append(objecttView.render().el);
    }
});

var directory = new DirectoryView();
} (jQuery));
