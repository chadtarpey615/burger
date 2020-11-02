// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    //var id = $(this).data("id");
    // let newDevour = $(this).data("newdevour");

    const newBurger = {
      burger_name: $("#newBurger").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burgers");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".change-devour").on("click", function (event) {
    event.preventDefault();

    let id = $(this).data("id");
    const devouredState = {
      devoured: true
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(function() {
      console.log("Burger devoured");
      location.reload();
    });
  });

  

  $(".delete-burger").on("click", function (event) {
    event.preventDefault();

    let id = $(this).data("id");

    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("deleted burger", id);

      location.reload();
    });
  
  });


});

