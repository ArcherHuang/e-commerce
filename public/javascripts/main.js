let sendCouponBtn = document.querySelector('.sendCoupon')
if (sendCouponBtn) {
  sendCouponBtn.addEventListener('click', function (e) {

    const coupon_id = sendCouponBtn.getAttribute('data-coupon-id')
    let emailBox = document.querySelectorAll('.email-box')

    for (let i = 0; i < emailBox.length; i++) {
      if (emailBox[i].children[0].checked) {

        axios.post('/send/coupon', {
          email: emailBox[i].children[1].textContent,
          coupon_id
        })
          .then(function (response) {

            // 1.handle success
            if (response.data.status === 'success') {
              // console.log(`message: ${response.data.message}`)
              emailBox[i].children[2].innerHTML = '已加到 Queue'
            } else {
              // console.log(`message: ${response.data.message}`)
            }

          })
          .catch(function (error) {
            // 2.handle error
            console.log(error)
          })
          .then(function () {
            // 3.always executed
          })

      }
    }

  })
}