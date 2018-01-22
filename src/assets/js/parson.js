export default {
  getUrlprson: function (dates, pars, bannerImg) {
    this.pars = pars
    this.bannerImg = bannerImg
    this.dates = dates.data.data[this.pars]
    this.showbanner = function () {
      let arrs = [];
      if (this.dates != null) {
        for (let i = 0; i < this.dates.length; i++) {
          arrs.push(this.dates[i][bannerImg])
        }
        return arrs
      }
    }
    this.navigation = function () {
      let naviges = []
      for (let i = 0; i < this.dates.length; i++) {
        naviges.push(this.dates[i])
      }
      return naviges
    }
    this.nows = function () {
      let nowlist = {}
      nowlist = this.dates
      return nowlist
    }
  }
}
