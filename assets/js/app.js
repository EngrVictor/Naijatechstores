let host = document.querySelectorAll('.dropdown-toggle');
      let prey = document.querySelectorAll('.dropdown-menu');
      let content = document.querySelector('#content');
      let blogs = document.querySelector('.spot');
      let caret = document.querySelectorAll('.caret');

      multiple = Array.from(prey);
      multiple1 = Array.from(host);
      carets = Array.from(caret);

      let addCaret = current => {
        span = current.parentNode.querySelector('.caret')
          span.style = `
            transform: rotate(360deg);
            transition: .4s ease;
          `;
          setTimeout(() => {
            span.style = `
            display: none;
            `
          },1000)
      }

      let removeCaret = caret => {
          caret.style = `
              display: block;
          `;
      }


      carets.forEach(current => {
         window.addEventListener('click', () => {
            removeCaret(current);
            // console.log(current);
        })
      });

      multiple1.forEach(current => {
        current.addEventListener('focus', () => {
          addCaret(current);
        })
      });

      multiple.forEach((current, index) => {
        current.addEventListener('click', event => {
          multiple1[index].value = event.target.outerText;
        })
      });

      let addProducts = entry => {
        let markup = `
          <div class="col-sm-6 col-md-3 product">
            <div class="body">
              <a href="#favorites" class="favorites" data-favorite="inactive"><i class="ion-ios-heart-outline"></i></a>
              <a href="/product/${entry.sys.id}"><img src="https:${entry.fields.images[0].fields.file.url}" title="${entry.fields.productName}" alt="${entry.fields.productName}"/></a>

              <div class="content align-center">
                <p class="price">₦${priceSplit(entry.fields.price)}</p>
                <h2 class="h3">${nameSplit(entry.fields.productName)} <br>${entry.fields.processor} <br>${entry.fields.hardDrive} ${entry.fields.memory}</h2>
                <hr class="offset-sm">

                <a class="btn btn-link" href="/product/${entry.sys.id}"> <i class="ion-android-open"></i> Details</a>
                <a class="btn btn-primary btn-sm rounded" href="tel:+2347017578648"> <i class="ion-android-call"></i> Contact Seller</a>
              </div>
            </div>
          </div>
        `;

        content.insertAdjacentHTML('beforeend', markup);
      }

      let generateAll = entry => {
        addProducts(entry);
      };

      let priceSplit = given => {
        let price = given.toString().split('');

        if (price.length >= 4) {
          let newPrice = price.splice(-3);
          let currentPrice = price.join('') + ',' + newPrice.join('');

          if (currentPrice.length > 7) {
            let current = currentPrice.toString().split('');
            let endPrice = current.splice(-7);
            currentPrice = current.join('') + ',' + endPrice.join('');
          }
          return currentPrice;
        }
      }

      let nameSplit = given => {
        let name = given.split(' ');
        let newName = [];

        if (name.length >= 3) {

          for (var i = 0; i < 3; i++) {
            newName[i] = name[i]
          }

          let currentName = newName.join(' ') + `<span title="${given}">...</span>`;
          return currentName;
        }else {
          return given;
        }  
      }

      let addSpinner = () => {
        let markup = `
          <center><img src="assets/img/products/spinningwheel.gif" class="spinner" alt="spinner"></center>
        `;

        content.insertAdjacentHTML('beforeend', markup);
      }

      let removeSpinner = () => {
        let el = document.querySelector('.spinner');

        el.remove();
      }

      addSpinner();
      

      let client = contentful.createClient({
        space: '506rx1s4kvpq',
        accessToken: 'cpYUmV3UQjbOMBkY90P-CDkzE1cy5fpdhPdaEvfAn_g'
      })

      let entryId = '11A5beQDhUeiFyKcaXipYN';

      client.getEntries( {
        content_type: 'product'
      })

      .then((response) => {
        removeSpinner();
        for (var i = 0; i < response.items.length; i++) {
          generateAll(response.items[i]);
        }
      })
      .catch(console.error)

      let capture = () => {
       var getEntry = id;
       localStorage.setItem("storageName",getEntry);
      }

      