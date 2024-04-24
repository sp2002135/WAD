// JavaScript code with modified data structure and functionality
document.addEventListener("DOMContentLoaded", function () {
  // Ensure the DOM is fully loaded before accessing elements

  let fetchData = () => {
    let httprequest = new XMLHttpRequest()
    httprequest.open("GET", "./data.json")
    httprequest.send()
    httprequest.onload = () => {
        let res = JSON.parse(httprequest.responseText)
        console.log(res)
        localStorage.setItem("users", JSON.stringify(res))
        displayData()
    }
  }
  
  let displayData = () => {
    let tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    let storedUser = JSON.parse(localStorage.getItem("users"))
    storedUser.map((user, index) => (
        tbody.innerHTML += `
              <tr>
                  <td>${index+1}</td>
                  <td>${user.name}</td>
                  <td>${user.username}</td>
                  <td>${user.email}</td>
                  <td>${user.dob}</td>
                  <td>${user.gender}</td>
                  <td>${user.hobbies}</td>
                  <td>${user.address.street}</td>
                  <td>${user.address.city}</td>
                  <td>${user.address.state}</td>
              </tr>`
    ))
  }

  // initial Data
  fetchData();

  let btn = document.getElementById("btn");
  btn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const name = document.getElementById("name").value;
      const dob = document.getElementById("dob").value;
      const gender = document.getElementById("gender").value;
      const hobbies = document.getElementById("hobbies").value;
      const city = document.getElementById("city").value;
      const state = document.getElementById("state").value;
      const street = document.getElementById("address").value;

      let postObject = {
          email,
          password,
          name,
          dob,
          gender,
          hobbies,
          username,
          address: {
              street: street,
              city: city,
              state: state,
          },
      };

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "https://jsonplaceholder.typicode.com/users/");
      xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify(postObject));

      xhr.onload = () => {
          if (xhr.status == 201) {
              let storedUser = JSON.parse(localStorage.getItem("users")) || [];
              storedUser.unshift(postObject);
              localStorage.setItem("users", JSON.stringify(storedUser));
              displayData();
          }
      };
  });
});
