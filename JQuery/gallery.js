(function ($) {
  const getRandomStr = function (len = 32) {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const maxPos = $chars.length
    let str = ''
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
  }
  function mapKeyToArr (map) {
    var res = []
    map.forEach(function (v, k) {
      if (v) {
        res.push(k)
      }
    })
    return res
  }
  const DATA = Symbol('DATA') // 数据
  const TOTALPAGE = Symbol('TOTALPAGE') // total page
  const CURRENTPAGE = Symbol('CURRENTPAGE') // current page
  const ISUPLOAD =Symbol('ISUPLOAD') // 是否上传
  const PICTURES = Symbol('PICTURES') // 图片列表
  const MODALWRAPPER = Symbol('MODALWRAPPER')
  const PAGENUMBERKEYUP = Symbol('PAGENUMBERKEYUP')
  const MODALID = Symbol('MODALID')
  const EVENT = Symbol('EVENT')
  const UPLOAD = Symbol('UPLOAD')
  $.gallery = function (options = {}) {
    var modalId = getRandomStr(Math.floor(Math.random() * 31) + 10)
    var modalWrapper = document.createElement('div')
    modalWrapper.setAttribute('tabindex', -1)
    modalWrapper.setAttribute('role', 'dialog')
    modalWrapper.classList.add('modal', 'fade', 'nathan-gallery-modal')
    modalWrapper.id = modalId
    modalWrapper.innerHTML = `
			<div class="modal-dialog modal-lg" role="document">
	            <div class="modal-content">
	                <div class="modal-header">
	                    <h4 class="modal-title">图库</h4>
	                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                </div>
	                <div class="modal-body">
	                	<div style="padding-bottom: 10px;">
		                	<button style="display: none" class="nathan-gallery-upload btn btn-primary">上传图片</button>
		                	<input type="file" class="nathan-gallery-real-upload" multiple accept="image/*" style="display: none">
	                	</div>
	                    <div class="wrapper flex space-between">
	                        <div class="pictures-wrapper">
	                            <div class="pictures flex space-between"></div>
	                            <nav aria-label="Page navigation">
	                                <ul class="pagination justify-content-end pagination-sm" id="add-pic-modal-pagination">
	                                    <li class="page-item">
	                                        <a class="page-link" aria-label="Previous">
	                                            <span aria-hidden="true">&laquo;</span>
	                                        </a>
	                                    </li>

	                                    <li class="page-item">
	                                        <a class="page-link" aria-label="Next">
	                                            <span aria-hidden="true">&raquo;</span>
	                                        </a>
	                                    </li>
	                                </ul>
	                                <div class="flex justify-content-end align-items-center">
	                                    <span>第</span>
	                                    <input class="nathan-gallery-page-num" value="1" class="form-control" style="display: inline-block;width: 50px" type="number"/>
	                                    <span>页，共</span>
	                                    <span class="nathan-gallery-total-page">1</span>
	                                    <span>页</span>
	                                </div>
	                            </nav>
	                        </div>
	                        <div class="pictures-select-wrapper">
	                            <div class="select-header">已选择图片(<span class="nathan-gallery-selected-pic-num">0</span>/<span class="nathan-gallery-limit">10</span>)</div>
	                            <div class="sp_category_attribute_tip nathan-gallery-limit-tip" style="color: red;display: none">每次最多只能选<span class="nathan-gallery-limit">10</span>张</div>
	                            <div><span class="sp_category_attribute_tip">(点击下面图片可删除)</span></div>
	                            <div class="pictures-selected"></div>
	                        </div>
	                    </div>
	                </div>
	                <div class="modal-footer">
	                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	                    <button class="nathan-gallery-confirm btn btn-primary">确定</button>
	                </div>
	            </div>
	        </div>
		`
    $('body').append(modalWrapper)
    return new Gallery(options, modalId)
  }
  function pageChange (e, that) {
    var val = e.target.value
    if (!isNaN(val) && Number(val) <= that[TOTALPAGE]) {
      that[CURRENTPAGE] = val
      that[EVENT]['page-change'](val, that[TOTALPAGE])
    } else {
      e.target.value = that[CURRENTPAGE]
    }
  }
  class Gallery {
    constructor (options = {}, modalId) {
      options = Object.assign({
        isUpload: true,
        totalPage: 1,
        currentPage: 1,
        selectedLimit: 10,
        data: [],
        selectedPictures: [],
        confirm: function () {},
        cancel: function () {},
        upload: function () {}
      }, options)
      this[DATA] = options.data
      this.changeTotalPage(options.totalPage)
      this[CURRENTPAGE] = options.currentPage
      this[ISUPLOAD] = options.isUpload
      this.upload = options.upload
      this[MODALID] = modalId
      this.customConfirm = options.confirm
      this.customCancel = options.cancel
      this.changeLimit(options.selectedLimit)
      this.selectedPictures = new Map()
      for (var i = 0; i < options.selectedPictures; i++) {
        this.selectedPictures.set(options.selectedPictures[i], true)
      }
      this[EVENT] = {
        'page-change': function (currentPage, totalPage) {},
        confirm: function (selected) {}
      }
      this[PICTURES] = $(`#${this[MODALID]} .modal-body .pictures-wrapper .pictures`)
      this[MODALWRAPPER] = $(`#${this[MODALID]}`)
      var that = this
      $(`#${this[MODALID]} .nathan-gallery-page-num`).on('keyup', function (e) {
        if (e.keyCode == "13" && e.target.value != that[CURRENTPAGE]) {
          pageChange(e, that)
        }
      })
      $(`#${this[MODALID]} .nathan-gallery-page-num`).on('blur', function (e) {
        if (e.target.value != that[CURRENTPAGE]) {
          pageChange(e, that)
        }
      })
      $(`#${this[MODALID]} nav .pagination`).click(function (e) {
        var i = e.target.innerText
        if (i === '«') {
          if (that[CURRENTPAGE] > 1) {
            that[CURRENTPAGE]--
            $(`#${that[MODALID]} .nathan-gallery-page-num`).val(that[CURRENTPAGE])
            that[EVENT]['page-change'](that[CURRENTPAGE], that[TOTALPAGE])
          }
        }
        if (i === '»') {
          if (that[CURRENTPAGE] < that[TOTALPAGE]) {
            that[CURRENTPAGE]++
            $(`#${that[MODALID]} .nathan-gallery-page-num`).val(that[CURRENTPAGE])
            that[EVENT]['page-change'](that[CURRENTPAGE], that[TOTALPAGE])
          }
        }

      })
      this.generateImageTag(this[DATA])
      this[PICTURES].click(function (e) {
        if (e.target.tagName === 'IMG') {
          var num = $(`#${that[MODALID]} .nathan-gallery-selected-pic-num`)[0]
          var src = e.target.src
          if (that.selectedLimit > 1) {
            if (Number(num.innerText) < that.selectedLimit) {
              $(`#${that[MODALID]} .nathan-gallery-limit-tip`).css('display', 'none');
              if (!that.selectedPictures.has(src)) {
                var img = new Image()
                img.src = src
                img.setAttribute('class', 'pic')
                that.selectedPictures.set(src, true)
                $(`#${that[MODALID]} .modal-body .pictures-select-wrapper .pictures-selected`).append(img)
                num.innerText = Number(num.innerText) + 1
              }
            } else {
              $(`#${that[MODALID]} .nathan-gallery-limit-tip`).css('display', 'block');
            }
          } else if (that.selectedLimit === 1) {
            $(`#${that[MODALID]} .nathan-gallery-limit-tip`).css('display', 'none');
            if (!that.selectedPictures.has(src)) {
              var selectedWrapper = $(`#${that[MODALID]} .modal-body .pictures-select-wrapper .pictures-selected`)
              selectedWrapper.empty()
              var img = new Image()
              img.src = src
              img.setAttribute('class', 'pic')
              that.selectedPictures.set(src, true)
              $(`#${that[MODALID]} .modal-body .pictures-select-wrapper .pictures-selected`).append(img)
              num.innerText = 1
            }
          }
        }
      })
      $(`#${this[MODALID]} .modal-body .pictures-select-wrapper .pictures-selected`).click(function (e) {
        if (e.target.tagName === 'IMG') {
          $(`#${that[MODALID]} .nathan-gallery-limit-tip`).css('display', 'none');
          var src = e.target.src
          that.selectedPictures.delete(src)
          $(e.target).remove()
          var num = $(`#${that[MODALID]} .nathan-gallery-selected-pic-num`)[0]
          num.innerText = Number(num.innerText) - 1
        }
      })
      $(`#${this[MODALID]}`).on('hidden.bs.modal', function () {
        that.customCancel()
        that.selectedPictures = new Map()
        that[DATA] = []
        that[TOTALPAGE] = 1
        that[CURRENTPAGE] = 1
        $(`#${that[MODALID]} .nathan-gallery-selected-pic-num`)[0].innerText = 0
        $(`#${that[MODALID]} .nathan-gallery-page-num`).val(1)
        $(`#${that[MODALID]} .modal-body .pictures-select-wrapper .pictures-selected`).empty()
      })
      $(`#${this[MODALID]}  .nathan-gallery-confirm`).click(this.confirm.bind(that))
      // 上传图片
      $(`#${this[MODALID]} .nathan-gallery-upload`).click(function () {
        console.log('button')
        $(`#${that[MODALID]} .nathan-gallery-real-upload`).click()
        $(`#${that[MODALID]} .nathan-gallery-real-upload`).change(function (e) {
          that.upload(e)
        })
      })
      if (this[ISUPLOAD]) {
        this.showUploadButton()
      }
    }

    setOptions (options = {}) {
      if (options.hasOwnProperty('data')) {
        this.setData(options.data)
      }
      if (options.hasOwnProperty('isUpload')) {
        this[ISUPLOAD] = !!options.isUpload
        if (options.isUpload) {
          this.showUploadButton()
        } else if (options.isUpload === false) {
          this.hideUploadButton()
        }
      }
      if (options.hasOwnProperty('totalPage')) {
        if (options.totalPage >= 1) {
          this.changeTotalPage(options.totalPage)
        }
      }
      if (options.hasOwnProperty('currentPage')) {
        if (options.currentPage >= 1) {
          this.changePage(options.currentPage)
        }
      }
      if (options.hasOwnProperty('selectedLimit')) {
        if (options.selectedLimit >= 1) {
          this.changeLimit(options.selectedLimit)
        }
      }
      if (options.hasOwnProperty('confirm')) {
        this.customConfirm = options.confirm
      }
      if (options.hasOwnProperty('cancel')) {
        this.customCancel = options.cancel
      }
      if (options.hasOwnProperty('upload')) {
        this.upload = options.upload
      }

    }
    show () {
      this[MODALWRAPPER].modal('show')
    }
    showUploadButton () {
      $(`#${this[MODALID]} .nathan-gallery-upload`).css('display', 'block')
    }
    hideUploadButton () {
      $(`#${this[MODALID]} .nathan-gallery-upload`).css('display', 'none')
    }
    changeTotalPage (totalPage) {
      this[TOTALPAGE] = totalPage
      $(`#${this[MODALID]} .nathan-gallery-total-page`).text(this[TOTALPAGE])
    }
    changeLimit (selectedLimit) {
      this.selectedLimit = selectedLimit
      $(`#${this[MODALID]} .nathan-gallery-limit`).text(this.selectedLimit)
    }
    generateImageTag () {
      var wrapper = this[PICTURES]
      wrapper.empty()
      var frag = document.createDocumentFragment()
      var data = this[DATA]
      for (let i = 0; i < data.length; i++) {
        var img = new Image()
        img.src = data[i].image_url
        img.setAttribute('class', 'pic')
        frag.appendChild(img)
      }
      wrapper[0].appendChild(frag)
      return this
    }
    setData (data, totalPage) {
      this[DATA] = data
      this.generateImageTag()
      if (totalPage !== void 0 && totalPage !== null) {
        if (totalPage !== this[TOTALPAGE]) {
          this[TOTALPAGE] = totalPage
          $(`#${this[MODALID]} .nathan-gallery-total-page`).text(totalPage)
        }
      }
      return this
    }
    changePage (page) {
      if (page <= this[TOTALPAGE]) {
        this[CURRENTPAGE] = page
        $(`#${this[MODALID]} .nathan-gallery-page-num`).val(page)
      } else {
        new Error('设置的页码超过了总页数')
      }
    }
    confirm () {
      var selected = mapKeyToArr(this.selectedPictures)
      if (selected.length > 0) {
        this.customConfirm(selected)
        this[EVENT].confirm(selected)
        this.selectedPictures = new Map()
        this[DATA] = []
        this[TOTALPAGE] = 1
        this[CURRENTPAGE] = 1
        $(`#${this[MODALID]} .nathan-gallery-selected-pic-num`)[0].innerText = 0
        $(`#${this[MODALID]} .nathan-gallery-page-num`).val(1)
        $(`#${this[MODALID]} .modal-body .pictures-select-wrapper .pictures-selected`).empty()
        this[MODALWRAPPER].modal('hide')
      }
    }
    on (event, callBack) {
      this[EVENT][event] = callBack
    }
    destory () {
      this[PICTURES].off('click')
    }
  }
}(jQuery));
