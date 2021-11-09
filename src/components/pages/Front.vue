<template>
  <div>
    <header>
      <nav
        class="
          navbar navbar-expand-md navbar-dark
          fixed-top
          navbar-inverse navbar-inner
        "
        v-bind:class="{ inverse1: i != 0 }"
      >
      <!-- $primary:       $blue !default;
$secondary:     $gray-600 !default;
$success:       $green !default;
$info:          $cyan !default;
$warning:       $yellow !default;
$danger:        $red !default;
$light:         $gray-100 !default;
$dark:  -->



        <!-- <nav class="navbar navbar-expand-md  fixed-top navbar-inverse navbar-inner"
    :class="{inverse1:i==0 , inverse2:i!=0 }"> -->
        <a class="navbar-brand" href="#">美食街</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#"
                >Home <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
            登入
          </button>
        </div>
      </nav>
    </header>

    <main role="main">
      <section class="jumbotron text-center"
      style="
                      background-size: cover;
                      background-position: center;
                      background-image: url('http://localhost:8082/16348130439051456.jpg');
                    "
                    :style="{ backgroundImage: `url(${imageUrl})` }"
      
      >
        <div class="container">
          <div class="row justify-content-center align-items-center">
          <div class="col-4">
          <h1>加入美食街</h1>
          <p class="lead text-muted">
            高貴不貴，美味加倍
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          </p>
          <p>
            <a href="#" class="btn btn-primary my-2">店家加入</a>
            <a href="#" class="btn btn-secondary my-2">會員加入</a>
          </p>
          </div>
          </div>
        </div>


      </section>

      <!-- for shop -->
      <!-- <section class="jumbotron ">
    
    <div class="jumbotron p-4 p-md-5 text-white rounded ">
    <div class="col-md-6 px-0">
      <h1 class="display-4 font-italic ">Title of a longer featured blog post</h1>
      <p class="lead my-3  text-muted">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
      <p class="lead mb-0 "><a href="#" class="text-white font-weight-bold text-muted">Continue reading...</a></p>
      <p>
        <a href="#" class="btn btn-primary my-2">Main call to action</a>
        <a href="#" class="btn btn-secondary my-2">Secondary action</a>
      </p>
    </div>
  </div>
  </section> -->

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="col-md-12 order-md-1">
            <h4 class="mb-3">外送地點：</h4>
            <form class="needs-validation" novalidate>
              <div class="row">
                <div class="col-md-2 mb-3">
                  <!-- <label for="country">城市</label> -->
                  <select
                    class="custom-select d-block w-100"
                    id="country"
                    required
                  >
                    <option value="">城市...</option>
                    <option>United States</option>
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div class="col-md-2 mb-3">
                  <!-- <label for="state">區域</label> -->
                  <select
                    class="custom-select d-block w-100"
                    id="state"
                    required
                  >
                    <!-- <option value="">區域...</option> -->
                    <option>區域...</option>
                  </select>
                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div class="col-md-5 mb-3">
                  <!-- <label for="zip">路</label> -->
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    placeholder="詳細地址..."
                    required
                  />
                  <div class="invalid-feedback">Zip code required.</div>
                </div>
                <div class="col-md-2 mb-3">
                  <!-- <label for="state">區域</label> -->
                  <select
                    class="custom-select d-block w-100"
                    id="state"
                    required
                  >
                    <option value="Reserve">預約外送</option>
                    <option>California</option>
                  </select>
                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div class="col-md-1 mb-3">
                  <!-- <label for="state">區域</label> -->

                  <button
                    class="btn btn-outline-success my-2 my-sm-0 w-100"
                    type="submit"
                  >
                    搜尋
                  </button>

                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
              </div>
            </form>
          </div>
          <h4 class="mb-3">城市：</h4>
          <div class="row">
            <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <a href="#" class="nav-link">
                  <div
                    class="row justify-content-center align-items-center"
                    style="
                      height: 150px;
                      background-size: cover;
                      background-position: center;
                      background-image: url('http://localhost:8082/16348130439051455.png');
                    "
                    :style="{ backgroundImage: `url(${imageUrl})` }"
                  >
                    <h1>台南1</h1>
                  </div></a
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <a href="#" class="nav-link">
                  <div
                    class="row justify-content-center align-items-center"
                    style="
                      height: 150px;
                      background-size: cover;
                      background-position: center;
                      background-image: url('http://localhost:8082/16348130439051456.jpg');
                    "
                    :style="{ backgroundImage: `url(${imageUrl})` }"
                  >
                    <h1>台南</h1>
                  </div></a
                >
              </div>
            </div>
          </div>
           <a href='https://.pngtree.com/free-backgrounds'>來自的免費背景照片 .pngtree.com/</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i: 0,
      imageUrl: "http://localhost:8082/16348130439051456.jpg",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var scroll = scrollTop - this.i;
      this.i = scrollTop;
      console.log("scrollTop：", this.i);
      if (scroll < 0) {
        console.log("up");
      } else {
        console.log("down");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/_homeboard";
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.navbar-overlay {
  margin-bottom: -104px; // Pulls the content under the navbar up by 104px which is the height of your navbar.
  z-index: 1; // Tells the browser that your navbar should be ontop of your content. This allows your links in your navbar to still work when you hover over them.
}



.inverse12 {
  font-size: 3.5rem;
  background-color: transparent;
}

.inverse2 {
  font-size: 1.5rem;
  background-color: blue;
}
</style>