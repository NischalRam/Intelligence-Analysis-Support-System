# Intelligence-Analysis-Support-System


<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            box-sizing: border-box
        }

        body {
            font-family: Verdana, sans-serif;
            margin: 0
        }

        .images {
            display: none
        }

        img {
            vertical-align: middle;
            width: 100%;
        }

        /* Slideshow container */
        .carousel-container {
            max-width: 1000px;
            position: relative;
            margin: auto;
        }

        /* Next & previous buttons */
        .previous,
        .next {
            cursor: pointer;
            position: absolute;
            top: 50%;
            width: auto;
            padding: 16px;
            margin-top: -22px;
            color: white;
            font-weight: bold;
            font-size: 18px;
            transition: 0.6s ease;
            border-radius: 0 3px 3px 0;
            user-select: none;
        }

        /* Position the "next button" to the right */
        .next {
            right: 0;
            border-radius: 3px 0 0 3px;
        }


        /* On hover, add a black background color with a little bit seethrough */
        .prev:hover,
        .next:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }


        /* The dots/bullets/indicators */
        .navigation-dot {
            cursor: pointer;
            height: 15px;
            width: 15px;
            margin: 0 2px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.6s ease;
        }

        .active,
        .navigation-dot:hover {
            background-color: #717171;
        }
    </style>
</head>

<body>
    <div class="carousel-container">
        <div class="images fade">
            <img class="slider-image" src="PPT_images/1.png" alt="Image 1">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/2.png" alt="Image 2">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/3.png" alt="Image 3">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/4.png" alt="Image 4">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/5.png" alt="Image 5">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/6.png" alt="Image 6">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/7.png" alt="Image 7">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/8.png" alt="Image 8">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/9.png" alt="Image 9">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/10.png" alt="Image 10">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/11.png" alt="Image 11">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/12.png" alt="Image 12">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/13.png" alt="Image 13">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/14.png" alt="Image 14">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/15.png" alt="Image 15">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/16.png" alt="Image 16">
        </div>
        <div class="images fade">
            <img class="slider-image" src="PPT_images/17.png" alt="Image 17">
        </div>

        <!-- Previous and Next Buttons -->
        <a class="previous" onclick="plusSlides(-1)">❮</a>
        <a class="next" onclick="plusSlides(1)">❯</a>
    </div>
    <br>

    <!-- Navigation Dots-->
    <div style="text-align:center">
        <span class="navigation-dot" onclick="currentSlide(1)"></span>
        <span class="navigation-dot" onclick="currentSlide(2)"></span>
        <span class="navigation-dot" onclick="currentSlide(3)"></span>
        <span class="navigation-dot" onclick="currentSlide(4)"></span>
        <span class="navigation-dot" onclick="currentSlide(5)"></span>
        <span class="navigation-dot" onclick="currentSlide(6)"></span>
        <span class="navigation-dot" onclick="currentSlide(7)"></span>
        <span class="navigation-dot" onclick="currentSlide(8)"></span>
        <span class="navigation-dot" onclick="currentSlide(9)"></span>
        <span class="navigation-dot" onclick="currentSlide(10)"></span>
        <span class="navigation-dot" onclick="currentSlide(11)"></span>
        <span class="navigation-dot" onclick="currentSlide(12)"></span>
        <span class="navigation-dot" onclick="currentSlide(13)"></span>
        <span class="navigation-dot" onclick="currentSlide(14)"></span>
        <span class="navigation-dot" onclick="currentSlide(15)"></span>
        <span class="navigation-dot" onclick="currentSlide(16)"></span>
        <span class="navigation-dot" onclick="currentSlide(17)"></span>
    </div>
    <script>
        var currentIndex = 1;

        //Show current image
        showSlides(currentIndex);

        //Function to move Next
        function plusSlides(n) {
            showSlides(currentIndex += n);
        }

        //Function to move back
        function currentSlide(n) {
            showSlides(currentIndex = n);
        }


        //Initiate moving of slides
        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("images");
            var dots = document.getElementsByClassName("navigation-dot");
            if (n > slides.length) { currentIndex = 1 }
            if (n < 1) { currentIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[currentIndex - 1].style.display = "block";
            dots[currentIndex - 1].className += " active";
        }
    </script>
</body>

</html>
