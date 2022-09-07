$(function () {
    $('.btn-check').on('change', function () {
        var query = this.value;
        $('.form-check-label').each(function (i, elem) {
            if ($(this).attr('id').indexOf(query) != -1) {
                $(this).show();
                $(this).prev(':checkbox').show();
                $(this).next('br').show();
            } else {
                $(this).hide();
                $(this).prev(':checkbox').hide();
                 $(this).next('br').hide();
            }
        });
    });
});

$(function () {
    $('#filter').on('keyup', function () {
        var query = this.value;
        $('.form-check-label').each(function (i, elem) {
            if ($(this).text().indexOf(query) != -1) {
                $(this).show();
                $(this).prev(':checkbox').show();
                $(this).next('br').show();
            } else {
                $(this).hide();
                $(this).prev(':checkbox').hide();
                 $(this).next('br').hide();
            }
        });
    });
});