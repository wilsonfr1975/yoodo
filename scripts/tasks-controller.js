tasksController = function () {
  function errorLogger(errorCode, errorMessage) {
    console.log(errorCode + ':' + errorMessage);
  }

  var taskPage;
  var initialized = false;

  return {
    init : function(page) {
      if (!initialized) {
        storageEngine.init(function () {
          storageEngine.initObjectStore('task', function () {
          }, errorLogger)
        }, errorLogger);

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
          storageEngine.delete('task', $(event.target).data().taskId, function () {
            $(event.target).parents('tr').remove();
          }, errorLogger);
        });

        $(taskPage).find('#saveTask').click(function(event) {
          event.preventDefault();
          if ($(taskPage).find('form').valid()) {
            var task = $('form').toObject();

            storageEngine.save('task', task, function(savedTask) {
              $('#taskRow').tmpl(savedTask).appendTo($(taskPage).find('#tblTasks tbody'));
            }, errorLogger);
          }
        });

        initialized = true;
      }
    },
    loadTasks : function () {
      storageEngine.findAll('task', function(tasks) {
        $.each(tasks, function(i, task) {
          $('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
        });
      }, errorLogger);
    }
  }
}();
