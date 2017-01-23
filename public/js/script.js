$(document).ready(function () {

    var timer;

    $('[data-action]').click(function () {
        var id = $('input[type="text"]').val();
        var action = $(this).attr('data-action');

        $.ajax({
            type: 'POST',
            url: '/api/v1/product/actions/' + action,
            data: {
                id: id
            },
            success: function (response, textStatus, jqXHR) {
                updateButtons(response);
            }
        });
    });

    $('input[type="text"]').keyup(function () {
        console.log(true);
        getProduct();
    });

    function getProduct() {
        var id = $('input[type="text"]').val();

        if (timer) {
            clearTimeout(timer);
        }

        if (!id) {
            $('button[data-action]').attr('disabled', 'disabled');

            return;
        }

        timer = setTimeout(function() {
            $.ajax({
                type: 'GET',
                url: '/api/v1/product/' + id,
                success: function (response, textStatus, jqXHR) {
                    updateButtons(response);
                }
            });
        }, 1000);
    }

    function updateButtons(product) {
        // If product doesn't exist, we should remove disable attribute from E, T, L and ETL.
        if (!product) {
            $('button[data-action]').removeAttr('disabled');

            return;
        }

        switch (product.productStatus) {
            // If product status is extracted, we should remove disable attribute from T and L.
            case 0: {
                $('button[data-action="transform"]').removeAttr('disabled');
                $('button[data-action="load"]').removeAttr('disabled');
                break;
            }
            // If product status is transformed, we should remove disable attribute from L.
            case 1: {
                $('button[data-action="load"]').removeAttr('disabled');
                break;
            }
            // If product status is transformed, we shouldn't remove disable attribute from the buttons.
            case 2: {
                break;
            }
            // If product status is transformed, we shouldn't remove disable attribute from the buttons.
            case 3: {
                break;
            }
        }
    }

});
