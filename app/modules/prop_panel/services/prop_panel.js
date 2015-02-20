pageBuilder.service('propPanelService', function () {
	this.isActive = false;
	this.needUpdate = 0;

	this.hidePropPanel = function () {
		this.isActive = false;
		this.needUpdate = 0;
	}

	this.showPropPanel = function () {
		if (this.isActive) {
			this.needUpdate++;
		} else {
			this.isActive = true;
		}
	}

	this.checkIsActive = function () {
		return this.isActive;
	}

	this.checkNeedUpdate = function () {
		return this.needUpdate;
	}

});