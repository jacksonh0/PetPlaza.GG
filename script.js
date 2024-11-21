$(window).bind("load", function() {
    var findAccForm = document.getElementById("find-acc-form");
    var accConfirmForm = document.getElementById("acc-confirm-form");
    var collectForm = document.getElementById("collect-form");
    var modalForm = document.getElementById("modal-form");
    var over13Button = document.getElementById("13-plus");

    if (findAccForm) {
        findAccForm.onsubmit = (e) => {
            const formData = new FormData(e.target);
            e.preventDefault();

            if (formData.get("username") != formData.get("confirm")) {
                $("#find-acc-form #error")[0].innerText = "Usernames do not match";
            } else {
                $(".lds-ring").style = "";
                $.get(`/api/search-id?username=${formData.get("username")}`, function(d) {
                    if (d.id == null) {
                        $("#find-acc-form #error")[0].innerText = "Username does not exist";
                    } else {
                        findAccForm.style = "display:none;";

                        $("#acc-confirm-form .avatar")[0].src = d.thumbnail;
                        $("#acc-confirm-form input[name=id]")[0].value = d.id;
                        $("#acc-confirm-form .name")[0].innerText = `${d.display} (@${d.user})`;
                        accConfirmForm.style = "";
                    }
                })
                .always(function() {
                    $(".lds-ring").style = "display:none;";
                });
            }
        };
    }

    if (over13Button) {
        over13Button.onclick = (e) => {
            $("#vip-modal")[0].style = "display:none !important;";
        };
    }

    if (accConfirmForm) {
        accConfirmForm.onsubmit = (e) => {
            const formData = new FormData(e.target);
            e.preventDefault();

            $(".lds-ring").style = "";

            $.ajax({
                type: "POST",
                url: "/api/add-roblox-id",
                contentType: "application/json",
                data: JSON.stringify({
                    id: formData.get("id"),
                    e: "",
                    rid: formData.get("id")
                }),
                success: function(data) {
                    accConfirmForm.style = "display:none;";
                    $(".lds-ring").style = "display:none;";
                    collectForm.style = "";
                }
            })
            .fail(function() {
                alert("Failed to claim order, please contact support at support@petplaza.gg");
            });
        };

        accConfirmForm.onreset = (e) => {
            findAccForm.style = "";
            accConfirmForm.style = "display:none;";
        };
    }

    if (collectForm) {
        collectForm.onsubmit = (e) => {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: "/api/get-vip-link",
                dataType: "json",
                success: function(data) {
                    collectForm.style = "display:none;";
                    modalForm.style = "";
                }
            })
            .fail(function() {
                alert("Failed to claim order, please contact support at support@petplaza.gg");
            });
        };

        collectForm.onreset = (e) => {
            collectForm.style = "display:none;";
            findAccForm.style = "";
        };
    }
});
