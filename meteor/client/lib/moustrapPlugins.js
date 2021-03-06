(function (Mousetrap) {
	var _originalStopCallback = Mousetrap.prototype.stopCallback;
	var _originalHandleKey = Mousetrap.prototype.handleKey;

	let _shouldAbortNextCombo = false;
	let _isEscapePressed = false;

	const _downKeys = [];

	Mousetrap.prototype.handleKey = function (character, modifiers, e) {
		var self = this;

		if (e.type === 'keydown' && !_downKeys.includes(character)) _downKeys.push(character);
		if (e.type === 'keyup') {
			const index = _downKeys.indexOf(character)
			if (index >= 0) {
				_downKeys.splice(_downKeys.indexOf(character), 1);
			}
		}

		return _originalHandleKey.apply(self, arguments);
	};

	Mousetrap.prototype.stopCallback = function (e, element, combo, sequence) {
		var self = this;

		if (self.paused) {
			return true;
		}

		if ((_shouldAbortNextCombo) && combo !== 'esc' && e.type === 'keyup') {
			_shouldAbortNextCombo = false;
			return true;
		}

		return _originalStopCallback.call(self, e, element, combo);
	};

	const escDown = function (e) {
		_isEscapePressed = true;

		if (!e.repeat) {
			_shouldAbortNextCombo = true;
			_comboTriggered = false;
		}
	};

	const escUp = function (e) {
		_isEscapePressed = false;

		if (_downKeys.length === 0) {
			_shouldAbortNextCombo = false;
		}
	};

	Mousetrap.init();

	Mousetrap.bind('esc', escDown, 'keydown');
	Mousetrap.bind('esc', escUp, 'keyup');
})(Mousetrap);
