$(function () {
  $('#order_form').on('submit', function () {
    $.post("/order/new", $('#order_form').serialize());
    alert("Great, we got your order. Now it's a waiting game.");
    return false;
  })
})