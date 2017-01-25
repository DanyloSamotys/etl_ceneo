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
        $('.product-title').append('<h2>Produkt</h2>');
        $('.product-name').text(product.productName);
        $('.product-score').text("Ocena produktu: "+ product.productScore+"/5");
        $('.product-price').text("Cena: " + product.productPrice + " zł");
        $('.opinion-title').append('<h3>Opinie</h3>');

        product.reviews.map(function (review) {
            
            $('.product-reviews').append('<hr>' +
                '<div class="product-review">' +
                '<div>Użytkownik: ' + review.productReviewer + '</div>' +
                '<div>Podsumowanie: ' + review.reviewerRecommendation + '</div>')
            if(review.positive_vote.length) {$('.product-reviews').append('<div>Łapkek w górę: ' + review.positive_vote + '</div>');}
            if(review.negative_vote.length) {$('.product-reviews').append('<div>Łapkek w dół: ' + review.negative_vote + '</div>');}
            if(review.opinion_date.length) {$('.product-reviews').append('<div>Data wystawienia opinii: ' + review.opinion_date + '</div>');}
            if(review.star_count.length) {$('.product-reviews').append('<div>Ilość gwiazdek: ' + review.star_count + '</div>');}
            if(review.opinion.length) {$('.product-reviews').append('<div>Opinia: ' + review.opinion + '</div>');}
            if(review.pros.length) {$('.product-reviews').append('<div>Zalety: ' + review.pros + '</div>');}
            if(review.cons.length) {$('.product-reviews').append('<div>Wady: ' + review.cons + '</div>');}
            $('.product-reviews').append('</div>')
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
