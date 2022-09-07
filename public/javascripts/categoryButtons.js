
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
const buttons = document.querySelectorAll('.btn-check')

Array.from(buttons)
    .forEach(function(button) {
      console.log("ahahaha")
        button.addEventListener('change', function () {
            console.log("somethings happening?")
            descriptions.find({category: button.id})
            let tempDescrionts = [];
            descriptions.forEach(element => tempDescriptions.push(...element.category));
            categories = [...new Set(tempDescriptions)]
            res.render('home', {categories})
            })
        })
