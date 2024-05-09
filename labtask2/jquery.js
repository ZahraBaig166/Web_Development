function displayProducts() {
    $.ajax({
      url: "https://65f70f69b4f842e808850ae1.mockapi.io/products",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var productsList = $("#productsList");
        productsList.empty();
  
        $.each(data, function (index, product) {
          var card = $("<div class='col-md-4 product-card'></div>");
          card.append("<h5>" + product.Productname + "</h5>");
          $("card").parent
          card.append("<p>Colour: " + product.colour + "</p>");
          card.append("<p>Material: " + product.material + "</p>");
          card.append("<p class=pricep>Price: $" + product.price + "</p>");
          card.append("<p>Description: " + product.description + "</p>");
          card.append("<div class=buttons><button class=' btn btn-outline-secondary btn-edit' data-id='" + product.id + "'>Edit</button> <button class=' btn btn-outline-secondary btn-del' data-id='" + product.id + "'>Delete</button></div>");
          productsList.append(card);
        });
      },
      error: function (error) {
        console.error("Error fetching products:", error);
      },
    });
  }
  
  function deleteProduct() {
    let productId = $(this).attr("data-id");
    $.ajax({
      url: "https://65f70f69b4f842e808850ae1.mockapi.io/products/" + productId,
      method: "DELETE",
      success: function () {
        displayProducts(); 
      },
      error: function (error) {
        console.error("Error deleting product:", error);
      },
    });
  }

  function editBtnClicked(event) {
    event.preventDefault();
    let productId = $(this).attr("data-id");
    $.ajax({
      url: "https://65f70f69b4f842e808850ae1.mockapi.io/products/" + productId,
      method: "GET",
      success: function (data) {
        console.log(data);
        $("#productName").val(data.Productname);
        $("#productColour").val(data.colour);
        $("#productMaterial").val(data.material);
        $("#productPrice").val(data.price);
        $("#productDescription").val(data.description);
        $("#createBtn").html("Update");
        $("#createBtn").attr("data-id", data.id);
        $("#clearBtn").show();
      },
      error: function (error) {
        console.error("Error fetching product:", error);
      },
    });
  }
  
  function handleFormSubmission(event) {
    event.preventDefault();
    let productId = $("#createBtn").attr("data-id");
    var productName = $("#productName").val();
    var productColour = $("#productColour").val();
    var productMaterial = $("#productMaterial").val();
    var productPrice = $("#productPrice").val();
    var productDescription = $("#productDescription").val();
  
    if (productId) {
      $.ajax({
        url: "https://65f70f69b4f842e808850ae1.mockapi.io/products/" + productId,
        method: "PUT",
        data: {
          Productname: productName,
          colour: productColour,
          material: productMaterial,
          price: productPrice,
          description: productDescription
        },
        success: function () {
          displayProducts(); 
          clearForm(); 
        },
        error: function (error) {
          console.error("Error updating product:", error);
        },
      });
    } else {
      $.ajax({
        url: "https://65f70f69b4f842e808850ae1.mockapi.io/products",
        method: "POST",
        data: {
          Productname: productName,
          colour: productColour,
          material: productMaterial,
          price: productPrice,
          description: productDescription
        },
        success: function () {
          displayProducts(); 
          clearForm();
        },
        error: function (error) {
          console.error("Error creating product:", error);
        },
      });
    }
  }
  
  function clearForm() {
    $("#createBtn").removeAttr("data-id");
    $("#createBtn").html("Create");
    $("#productName").val("");
    $("#productColour").val("");
    $("#productMaterial").val("");
    $("#productPrice").val("");
    $("#productDescription").val("");
    $("#clearBtn").hide();
  }
  
  $(document).ready(function () {
    displayProducts();
  
    $(document).on("click", ".btn-del", deleteProduct);
 
    $(document).on("click", ".btn-edit", editBtnClicked);
 
    $("#createForm").submit(handleFormSubmission);
 
    $("#clearBtn").on("click", function (e) {
      e.preventDefault();
      clearForm();
    });
  });
