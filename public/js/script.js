$(document).ready(function () {

    function addNotification(msg, status) {
        var notification = $('.alert');

        if (status) {
            notification.removeClass('alert-danger');
            notification.addClass('alert-success');
        } else {
            notification.removeClass('alert-success');
            notification.addClass('alert-danger');
        }

        notification.find('.alert-message').text(msg);
        notification.show();
    }

    function renderProduct(product) {
        console.log(product);
        $('.product-name').text(product.productName);
        $('.product-score').text(product.productScore);
        $('.product-price').text(product.productPrice);

        product.reviews.map(function (review) {
            $('.product-reviews').append('<hr>' +
                '<div class="product-review">' +
                '<div>productReviewer: ' + review.productReviewer + '</div>' +
                '<div>reviewerRecommendation: ' + review.reviewerRecommendation + '</div>' +
                '</div>')
        });
    }

    $('button[data-action="extract"]').click(function () {
        var id = $('input[type="number"]').val();

        $.ajax({
            type: 'POST',
            url: '/api/v1/product/actions/extract',
            data: {
                id: id
            },
            success: function (response, textStatus, jqXHR) {
                addNotification(response.message, true);
            },
            error: function (response) {
                addNotification(response.responseJSON.err, false);
            }
        });
    });

    $('button[data-action="transform"]').click(function () {
        var id = $('input[type="number"]').val();

        $.ajax({
            type: 'POST',
            url: '/api/v1/product/actions/transform',
            data: {
                id: id
            },
            success: function (response, textStatus, jqXHR) {
                addNotification(response.message, true);
            },
            error: function (response) {
                addNotification(response.responseJSON.err, false);
            }
        });
    });

    $('button[data-action="load"]').click(function () {
        var id = $('input[type="number"]').val();

        $.ajax({
            type: 'POST',
            url: '/api/v1/product/actions/load',
            data: {
                id: id
            },
            success: function (response, textStatus, jqXHR) {
                addNotification(response.message, true);
            },
            error: function (response) {
                addNotification(response.responseJSON.err, false);
            }
        });
    });

    $('button[data-action="etl"]').click(function () {
        var id = $('input[type="number"]').val();

        $.ajax({
            type: 'POST',
            url: '/api/v1/product/actions/etl',
            data: {
                id: id
            },
            success: function (response, textStatus, jqXHR) {
                addNotification(response.message, true);
            },
            error: function (response) {
                addNotification(response.responseJSON.err, false);
            }
        });
    });

    $('button[data-action="show"]').click(function () {
        var id = $('input[type="number"]').val();

        $.ajax({
            type: 'GET',
            url: '/api/v1/product/' + id,
            success: function (response, textStatus, jqXHR) {
                addNotification(response.message, true);
                renderProduct(response.product.productDetails);
            },
            error: function (response) {
                addNotification(response.responseJSON.err, false);
            }
        });
    });

    $('button[data-action="delete"]').click(function () {
        var id = $('input[type="number"]').val();

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/product/' + id,
            success: function (response, textStatus, jqXHR) {
                addNotification(response.message, true);
            },
            error: function (response) {
                addNotification(response.responseJSON.err, false);
            }
        });
    });


});
