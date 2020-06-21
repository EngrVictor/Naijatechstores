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
              <a href="./"><img src="https:${entry.fields.images[0].fields.file.url}" title="${entry.fields.images[0].fields.title}" alt="${entry.fields.images[0].fields.file.fileName}"/></a>

              <div class="content align-center">
                <p class="price">₦${priceSplit(entry.fields.price)}</p>
                <h2 class="h3">${entry.fields.productName} ${entry.fields.processor} ${entry.fields.hardDrive} ${entry.fields.memory}</h2>
                <hr class="offset-sm">

                <a class="btn btn-link" href="/product"> <i class="ion-android-open"></i> Details</a>
                <a class="btn btn-primary btn-sm rounded" href="tel:+2347017578648"> <i class="ion-android-call"></i> Contact Seller</a>
              </div>
            </div>
          </div>
        `;

        content.insertAdjacentHTML('beforeend', markup);
      }

      let products = [];

      let generate = entry => {
        for(let i = 0; i < 50; i++) {
          products[i] = addProducts(entry);
        }
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

      // client.getEntry(entryId)
      // .then((entry) => {
      //   console.log(entry.fields);
      //   // removeSpinner();
      //   generate(entry);
      //   // addProducts(entry);
        
      // }).catch(console.error)

      client.getEntries()
      .then((response) => {
        console.log(response.items[Math.round(Math.random() * 1)].fields)
        removeSpinner();
        generate(response.items[Math.round(Math.random() * 1)]);
        setTimeout(() => {
          generate(response.items[Math.round(Math.random() * 1)]);
        }, 2000)
      })
      .catch(console.error)

      // client.getEntry(entryId2)
      // .then((entry) => console.log(entry))
      // .catch(console.error)

      // client.getAsset(assetId)
      // .then((asset) => console.log(asset))
      // .catch(console.error)