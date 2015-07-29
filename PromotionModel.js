app.factories.PromotionModel = function (API, ToolsService) {

  var PromotionModel = function (data) {
    data = data || {};
    this.parse(data);
  };

  PromotionModel.prototype.parse = function (data) {
    data = data || {};

    this.id = data.id;
    this.finished_at = data.finished_at;
    this.promotion_config = data.promotion_config;
    this.budget = data.budget;
    this.budget_used = data.budget_used;
    this.budget_per_sale = data.budget_per_sale;
    this.status = data.status;

    this.compare_sales = data.compare_sales;
    this.compare_hours_on_field = data.compare_hours_on_field;
    this.compare_days_on_a_field = data.compare_days_on_a_field;
    this.compare_head_count = data.compare_head_count;

    this.promotion_config = data.promotion_config;
    this.week_end = this.id ? {
      dateInUnix: this.finished_at,
      humanDate: ToolsService.formatDate(this.finished_at)
    } : false;
    return this;
  };

  PromotionModel.prototype.create = function () {
    return API.createPromotion(this);
  };

  PromotionModel.prototype.getPromotionById = function (id) {
    var self = this;
    return API.getPromotionById(id).then(
      function (response) {
        return self.parse(response.data.data);
      });
  };

  PromotionModel.prototype.update = function () {
    return API.updatePromotion(this);
  };

  PromotionModel.prototype.remove = function () {
    return API.deletePromotion(this.id);
  };

  PromotionModel.prototype.cancel = function () {
    return API.cancelPromotion(this.id);
  };

  PromotionModel.prototype.save = function () {
    return this.id ? this.update() : this.create();
  };

  return PromotionModel;
};

app.factory('PromotionModel', app.factories.PromotionModel);
