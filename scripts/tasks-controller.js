tasksController = function () {
  var taskPage;
  var initialized = false;
  return {
    init: function(page) {
      if (!initialized) {
        taskPage = page;

        $(taskPage).find('[required]').prev('label').append('<span>*</span>').children('span').addClass('required');
        $(taskPage).find('tbody tr:even').addClass('even');

        $(taskPage).find('#btnAddTask').click(function(event) {
          event.preventDefault();
          $(taskPage).find('#taskCreation').removeClass('not');
        });

        $(taskPage).find('tbody tr').click(function(event) {
          $(event.target).closest('td').siblings().andSelf().toggleClass('rowHighlight');
        });

        $(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', function(event) {
          event.preventDefault();
          $(event.target).parents('tr').remove();
        });

        $(taskPage).find('#saveTask').click(function(event) {
          event.preventDefault();
          if ($(taskPage).find('form').valid()) {
            var task = $('form').toObject();
            $('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
          }
        });

        initialized = true;
      }
    }
  }
}();
