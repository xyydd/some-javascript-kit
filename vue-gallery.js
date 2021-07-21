// 依赖vue iview axios lodash
(function () {
	if (Vue) {
		Vue.component('n-gallery', {
			render: function (h) {
				const imageWrapper = []
				for (let i = 0; i < this.imageList.length; i++) {
					imageWrapper.push(h('img', {
						attrs: {
							class: 'pic',
							src: this.imageList[i].image_url
						}
					}))
				}
				const selectedImageWrapper = []
				for (let i = 0; i < this.selected.length; i++) {
					selectedImageWrapper.push(h('img', {
						attrs: {
							class: 'pic',
							src: this.selected[i]
						}
					}))
				}
				return h('Modal', {
					attrs: {
						class: 'n-gallery'
					},
					props: {
						'mask-closable': false,
						'z-index': 1040,
						width: 798,
						value: this.value,
						title: '图库'
					},
					on: {
						input: (v) => {
							this.$emit('input', v)
						},
						'on-ok': this.confirm,
						'on-cancel': this.cancel
					}
				}, [
					h('upload', {
						props: {
							'before-upload': this.upload
						}
					}, [
						h('i-button', {
							props: {
								icon: 'ios-cloud-upload-outline'
							}
						}, '批量上传图片')
					]),
					h('Row', {
						props: {
							type: 'flex',
							justify: 'space-between'
						}
					}, [
						h('div', [
							h('Row', {
								style: {
									width: '550px'
								},
								props: {
									type: 'flex'
								},
								nativeOn: {
									click: this.selectImage
								}
							}, imageWrapper),
							h('page', {
								props: {
									'show-total': true,
									current: this.currentPage,
									total: this.total,
									'page-size': 20
								},
								on: {
									'on-change': this.pageChange
								}
							})
						]),
						h('div', {
							style: {
								width: '200px'
							}
						}, [
							h('div', `已选择图片(${this.selected.length}/${this.selectedLimit})`),
							h('div', {
								attrs: {
									class: 'sp_category_attribute_tip'
								}
							}, '(点击下面图片可删除)'),
							h('div', {
								style: {
									'overflow-y': 'scroll',
    								height: '440px'
								},
								on: {
									click: this.deleteImage
								}
							}, selectedImageWrapper)
						])
					])
				])
			},
			props: {
				value: {
					type: Boolean,
					default: false
				},
				isUpload: {
					type: Boolean,
					default: false
				},
				uploadType: {
					type: Number,
					default: 0
				},
				selectedLimit: {
					type: Number,
					default: 10
				}
			},
			data () {
				return {
					imageList: [],
					selectedMap: {},
					currentPage: 1,
					total: 0
				}
			},
			computed: {
				selected () {
					const res = []
					for (let k in this.selectedMap) {
						if (this.selectedMap[k]) {
							res.push(k)
						}
					}
					return res
				}
			},
			mounted () {
				this.getPicList()
			},
			methods: {
				getPicList (currentPage = 1) {
					const data = new FormData()
					data.append('page_num', currentPage)
					data.append('limit', 20)
					axios.post('***', data)
						.then(res => {
							this.total = res.data.total
							this.imageList = res.data.data
						})
				},
				confirm () {
					if (this.selected.length > 0) {
						this.$emit('on-select-change', _.cloneDeep(this.selected))
						this.cancel()
					}
				},
				cancel () {
					this.selectedMap = {}
				},
				selectImage (e) {
					if (e.target.src && this.selected.length < this.selectedLimit) {
						this.$set(this.selectedMap, e.target.src, true)
					} else {
						this.$Message.info('请先删除一张已选择图片再添加')
					}
				},
				deleteImage (e) {
					console.log(e)
					if (e.target.src && this.selected.length > 0) {
						this.$delete(this.selectedMap, e.target.src)
					}
				},
				uploadPic (e) {
					if (e) {
						var files = e.target.files || e.dataTransfer.files || e.dataTransfer.getData;
						var data = new FormData()
						for (var i = 0; i < files.length; i++) {
							data.append("files[]", files[i]);
						}
						data.append('type', this.uploadType)
						axios.post('***', data)
							.then(res => {
								this.$Messgae.success('上传成功')
								this.getList()
							})
							.catch(error => {
								this.$Messgae.success('上传失败')
							})
					}
					return false
		        },
		        pageChange (page) {
		        	this.currentPage = page
		        	this.getPicList(page)
		        }
			}
		})
	} else {
		new Error('Vue has not defined')
	}
})()
