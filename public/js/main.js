// Signup form

$(document).ready(function () {
  $("#signup-form").submit(function (event) {
    event.preventDefault();
    // Serialize the form data
    let formData = $(this).serialize();
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: formData,
      success: function (response) {
        alert(response.Success);
      },
      error: function (xhr, status, error) {
        var errorMessage = "An error occurred";
        if (xhr.responseJSON && xhr.responseJSON.ERROR) {
          errorMessage = xhr.responseJSON.ERROR;
        }
        alert(errorMessage);
      },
    });
  });
});

// Login
$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();
    let formData = $(this).serialize();
    $.ajax({
      url: $(this).attr("action"),
      type: "post",
      data: formData,
      success: function (response) {
        alert(response.Success);
        window.location.href = "/";
      },
      error: function (xhr, status, error) {
        var errorMessage = "Login Failed";
        if (xhr.responseJSON && xhr.responseJSON.ERROR) {
          errorMessage = xhr.responseJSON.ERROR;
        }
        alert(errorMessage);
      },
    });
  });
});

// add post
$(document).ready(function () {
  $("#add-post").submit(function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    $.ajax({
      url: $(this).attr("action"),
      type: "post",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert(response.Success);
        window.location.href = "/profile";
      },
      error: function (xhr, status, error) {
        var errorMessage = "Login Failed";
        if (xhr.responseJSON && xhr.responseJSON.ERROR) {
          errorMessage = xhr.responseJSON.ERROR;
        }
        alert(errorMessage);
      },
    });
  });
});

// delete post
$(document).ready(function () {
  $(".delete-post").click(function () {
    const x = confirm("Do you want to delete this post");
    if (x) {
      const postId = $(this).attr("post-id");
      const $postElement = $(this).closest(".post");
      $.ajax({
        url: "posts/delete-blog/" + postId,
        type: "DELETE",
        success: function (response) {
          console.log(response);
          $postElement.remove();
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }
  });
});
