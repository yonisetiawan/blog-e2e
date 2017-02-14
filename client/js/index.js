$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/artikel/show",
        type: "GET",
        success: function(result) {
            var tampung = "";
            for (var i = 0; i < result.length; i++) {
                tampung +=
                    `<tr id="trID${result[i]._id}">
                              <td id="idTitle${result[i]._id}">${result[i].title}</td>
                              <td id="idIsi${result[i]._id}">${result[i].isi}</td>
                              <td id="idAuthor${result[i]._id}">${result[i].author}</td>
                              <td class="collapsing">
                                  <div class="ui fitted checkbox">
                                      <input id="${result[i]._id}" value="${result[i]._id}" type="checkbox"><label></label>
                                  </div>
                              </td>
                          </tr>`

            }
            $("#listtodo").append(tampung)
        }
    });
})

function postArtikel() {
    $.ajax({
        url: "http://localhost:3000/artikel/add",
        type: "POST",
        data: {
            title: $("#title").val(),
            isi: $("#isi").val(),
            author: $("#author").val()
        },
        success: function(result) {
            tampung =
                `<tr id="trID${result._id}">
                            <td id="idTitle${result._id}">${result.title}</td>
                            <td id="idIsi${result._id}">${result.isi}</td>
                            <td id="idAuthor${result._id}">${result.author}</td>
                            <td class="collapsing">
                                <div class="ui checkbox">
                                    <input id="${result._id}" value="${result._id}" type="checkbox"><label></label>
                                </div>
                              </td>
                        </tr>`
            $("#listtodo").prepend(tampung)
            $("#title").val(''),
            $("#isi").val(''),
            $("#author").val('')
        }
    });
}

function checkAction(input) {
    // console.log($("#cekStatus").val())
    // $("#cekStatus").is(':checked')
    // console.log($("#listtodo tr td.collapsing div input").first().attr("id"));
    // $("#listtodo tr td.collapsing div input").each(function(index, data) {
    //   console.log($(data).attr("id"))
    // })
    var statusUdpate = false;
    var arrId = []
    var list = $("#listtodo tr td.collapsing div")
    var listId = $("#listtodo tr td.collapsing div input")
    for (var i = 0; i < list.length; i++) {
        var id = $(listId[i]).attr("id")
        if ($(`#${id}`).is(':checked')) {
            if (input == "update") {
              statusUdpate = true
              $('#idUpdate').val(`${id}`)
              $('#titleUpdate').val($(`#idTitle${id}`).text())
              $('#isiUpdate').val($(`#idIsi${id}`).text())
              $('#authorUpdate').val($(`#idAuthor${id}`).text())
              break;
            }
            if (confirm("Are you sure you want to delete ?")) {
                document.getElementById(`trID${id}`).innerHTML = ""
                arrId.push(id)
            } else {
                return false;
                break;
            }
        }
    }
    if (input == "update") {
        updateArtikel(statusUdpate)
    } else {
        deleteArtikel(arrId)
    }
}

function deleteArtikel(input) {
    // alert(input)
    $.ajax({
        url: "http://localhost:3000/artikel/delete",
        type: "DELETE",
        data: {
            arrId: JSON.stringify(input)
        },
        success: function(result) {
            alert(result.status)
        }
    });
}

function updateArtikel(input) {
  if(input){
    $('.ui.modal')
        .modal('show');
  }else{
    alert("Pilih Artikel Untuk di Update")
  }
}

function runningUpdate() {
  var id = $('#idUpdate').val()
  var title = $('#titleUpdate').val()
  var isi = $('#isiUpdate').val()
  var author = $('#authorUpdate').val()
  if(title == "" || isi == "" || author == ""){
    alert("Jangan Kosongkan Form Upadate")
  }else{
    $.ajax({
        url: "http://localhost:3000/artikel/update",
        type: "PUT",
        data: {
            id: id,
            title: title,
            isi: isi,
            author: author
        },
        success: function(result) {
            tampung =
                `<tr id="trID${result._id}">
                            <td id="idTitle${result._id}">${result.title}</td>
                            <td id="idIsi${result._id}">${result.isi}</td>
                            <td id="idAuthor${result._id}">${result.author}</td>
                            <td class="collapsing">
                                <div class="ui checkbox">
                                    <input id="${result._id}" value="${result._id}" type="checkbox"><label></label>
                                </div>
                              </td>
                        </tr>`
            document.getElementById(`trID${result._id}`).innerHTML = tampung
        }
    });
  }
}
