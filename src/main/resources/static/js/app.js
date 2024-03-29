$(document).ready(function () {

    //displaying institutions

    var ulIns = $("ul.help--slides-items");

    var allInstitutions;

    function loadInstitutions() {
        $.ajax({
            url: "http://localhost:8080/institution/",
            type: "GET",
            contentType: "application/json"
        }).done(function (result) {
                allInstitutions = result;
                for (let i = 0; i < result.length; i++) {
                    if (result.length % 2 === 0) {
                        if (i % 2 === 0) {
                            let inst = result[i];
                            let nextInst = result[i + 1];
                            ulIns.append(
                                "<li>" +
                                "   <div class=\"col\">" +
                                "       <div class=\"title\">" + "Fundacja \"" + inst.name + "\"" + "</div>" +
                                "       <div class=\"subtitle\">" + "Cel i misja: " + inst.description + "</div>" +
                                "   </div>" +
                                "   <div class=\"col\">" +
                                "       <div class=\"title\">" + "Fundacja \"" + nextInst.name + "\"" + "</div>" +
                                "       <div class=\"subtitle\">" + "Cel i misja: " + nextInst.description + "</div>" +
                                "   </div>" +
                                "</li>");

                        }
                    } else {
                        if (i % 2 === 0 && i != result.length - 1) {
                            let inst = result[i];
                            let nextInst = result[i + 1];
                            ulIns.append(
                                "<li>" +
                                "   <div class=\"col\">" +
                                "       <div class=\"title\">" + "Fundacja \"" + inst.name + "\"" + "</div>" +
                                "       <div class=\"subtitle\">" + "Cel i misja: " + inst.description + "</div>" +
                                "   </div>" +
                                "   <div class=\"col\">" +
                                "       <div class=\"title\">" + "Fundacja \"" + nextInst.name + "\"" + "</div>" +
                                "       <div class=\"subtitle\">" + "Cel i misja: " + nextInst.description + "</div>" +
                                "   </div>" +
                                "</li>");
                        } else if (i === result.length - 1) {
                            let lastInst = result[i];
                            ulIns.append(
                                "<li>" +
                                "   <div class=\"col\">" +
                                "       <div class=\"title\">" + "Fundacja \"" + lastInst.name + "\"" + "</div>" +
                                "       <div class=\"subtitle\">" + "Cel i misja: " + lastInst.description + "</div>" +
                                "   </div>" +
                                "</li>");
                        }
                    }
                }
            }
        );
    }

    loadInstitutions();

    //displaying donated bags count

    var bagsCountDisplay = $("#stats > div > div:nth-child(1) > em");

    function loadBagsCount() {
        $.ajax({
            url: "http://localhost:8080/donation/count/bags/",
            type: "GET",
            contentType: "application/json"
        }).done(function (result) {
            bagsCountDisplay.empty();
            if (result === "") {
                bagsCountDisplay.append("0");
            } else {
                bagsCountDisplay.append(result);
            }
        });
    }

    loadBagsCount();

    //displaying supported institutions count

    var supInsCountDisplay = $("#stats > div > div:nth-child(2) > em");

    function loadSupInsCount() {
        $.ajax({
            url: "http://localhost:8080/donation/count/supins/",
            type: "GET",
            contentType: "application/json"
        }).done(function (result) {
            supInsCountDisplay.empty();
            supInsCountDisplay.append(result);
        });
    }

    loadSupInsCount();

    //displaying categories in form step 1

    var categoriesHeader = $("body > section > div.form--steps-container > form > div.active > h3");

    function loadCategories() {
        $.ajax({
            url: "http://localhost:8080/category/",
            type: "GET",
            contentType: "application/json"
        }).done(function (result) {
            let categories = "";
            $.each(result, function (i, category) {
                categories +=
                    "<div class=\"form-group form-group--checkbox\">" +
                    "   <label>" +
                    "       <input type=\"checkbox\" name=\"categories\" value=\"" + category.name + "\"/>" +
                    "       <span class=\"checkbox\"></span>" +
                    "       <span class=\"description\">" + category.description + "</span>" +
                    "   </label>" +
                    "</div>";
            });
            categoriesHeader.after(categories);
        });
    }

    loadCategories();

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                });
            });

            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });

            // Form submit
            this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */
        updateForm() {
            this.$step.innerText = this.currentStep;

            // TODO: Validation

            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
            this.$step.parentElement.hidden = this.currentStep >= 5;

            // TODO: get data from inputs and show them in summary

            var step3 = $('body > section > div.form--steps-container > form > div[data-step="3"]');

            var checkBoxes = $('div[data-step="1"] > div.form-group.form-group--checkbox > label > input[type=checkbox]');

            var pickedCategories = [];

            if (step3.hasClass("active")) {

                //saving picked categories names into pickedCategories array;

                var pickedInstitutions = [];

                checkBoxes.each(function (index, element) {
                    if ($(element).is(':checked')) {
                        pickedCategories.push($(element).attr('value'));
                    }
                });

                    //going through every institution's categories and comparing them with pickedCategories

                $(allInstitutions).each(function (index2, oneInstitution) {

                    if (oneInstitution.categories.length === pickedCategories.length) {

                        let currentInstitutionCategories = oneInstitution.categories;
                        let oneInstitutionCategoriesNames = [];

                        $(currentInstitutionCategories).each(function (index3, oneCategory) {
                            oneInstitutionCategoriesNames.push(oneCategory.name);
                        });

                        if (oneInstitutionCategoriesNames.sort().join() === pickedCategories.sort().join()) {
                            pickedInstitutions.push(oneInstitution);
                        }
                    }
                });

                //TODO: if there is no exact match...

                if (jQuery.isEmptyObject(pickedInstitutions)) {
                    console.log("there are no institutions matching selected categories");

                }

                var pickedInstitutionsButton = $('div[data-step="3"] > div.form-group.form-group--buttons');

                var institutionsToDisplay = "";

                $(pickedInstitutions).each(function (index4, onePickedInstitution) {

                    institutionsToDisplay +=
                        "<div class=\"form-group form-group--checkbox\">" +
                        "   <label>" +
                        "       <input type=\"radio\" name=\"organization\" value=\"old\"/>" +
                        "       <span class=\"checkbox radio\"></span>" +
                        "       <span class=\"description\">" +
                        "           <div class=\"title\">" + "Fundacja \"" + onePickedInstitution.name + "\"</div>" +
                        "           <div class=\"subtitle\">" + "Cel i misja: " + onePickedInstitution.description + "</div>" +
                        "       </span>" +
                        "   </label>" +
                        "</div>";
                });

                $('div[data-step="3"] > div.form-group.form-group--checkbox').remove();

                pickedInstitutionsButton.before(institutionsToDisplay);

                console.log(pickedInstitutions);
                console.log(pickedCategories);

            }

            console.log(pickedCategories);

            var step5 = $('body > section > div.form--steps-container > form > div[data-step="5"]');

            if (step5.hasClass("active")) {

                var donationBagCount = $('div[data-step="2"] > div.form-group.form-group--inline > label > input[type=number]').val();
                console.log("bags: " + donationBagCount);

                var donationBagCountDisplay = $('div[data-step="5"] > div.summary > div:nth-child(1) > ul > li:nth-child(1) > span.summary--text');
                donationBagCountDisplay.empty();
                donationBagCountDisplay.append("ilość worków: " + donationBagCount);


                var donationInstitution = null;
                var availableInstitutions = $('div[data-step="3"] > div.form-group.form-group--checkbox');
                availableInstitutions.each(function (index, oneAvailableInstitution) {
                    if($(oneAvailableInstitution).prop("checked", true)){
                        donationInstitution = oneAvailableInstitution;
                        console.log("a donationInstitution is checked!")
                    }
                });

                var donationInstitutionDisplay = $('div[data-step="5"] > div.summary > div:nth-child(1) > ul > li:nth-child(2) > span.summary--text');

                donationInstitutionDisplay.empty();
                donationInstitutionDisplay.append("dla fundacji: ");

            }

        }
    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }
});
