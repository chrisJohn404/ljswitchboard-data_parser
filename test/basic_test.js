
var data_parser = require('../lib/data_parser');


exports.tests = {
	'check IP registers - encode': function(test) {
		var results = [
			data_parser.encodeValue('WIFI_IP', '0.0.0.0'),
			data_parser.encodeValue('WIFI_IP', '0.0.0.1'),
			data_parser.encodeValue('WIFI_IP', '0.0.1.0'),
			data_parser.encodeValue('WIFI_IP', '0.1.0.0'),
			data_parser.encodeValue('WIFI_IP', '1.0.0.0'),
			data_parser.encodeValue('WIFI_IP', '192.168.1.207'),
			data_parser.encodeValue('WIFI_IP', '255.255.255.255'),
		];
		var reqResults = [
			0,
			1,
			256,
			65536,
			16777216,
			3232235983,
			4294967295
		];
		test.deepEqual(results, reqResults);
		test.done();
	},
	'check IP registers - decode': function(test) {
		var testVals = [
			{'val': 0, 'ip': '0.0.0.0'},
			{'val': 0, 'ip': '0.0.0.0'},
			{'val': 1, 'ip': '0.0.0.1'},
			{'val': 256, 'ip': '0.0.1.0'},
			{'val': 65536, 'ip': '0.1.0.0'},
			{'val': 16777216, 'ip': '1.0.0.0'},
			{'val': 3232235983, 'ip': '192.168.1.207'},
			{'val': 4294967295, 'ip': '255.255.255.255'},
		];

		var results = [];
		var reqResults = [];

		testVals.forEach(function(testVal) {
			results.push(data_parser.parseResult('WIFI_IP', testVal.val));
			reqResults.push({
				'register': 'WIFI_IP',
				'name': 'WIFI_IP',
				'address': 49200,
				'res': testVal.val,
				'str': testVal.ip
			});
		});
		test.deepEqual(results, reqResults);
		test.done();
	},
	'check HARDWARE_INSTALLED -decode': function(test) {
		var res = data_parser.parseResult('HARDWARE_INSTALLED', 3);
		// console.log('Result', res);
		test.done();
	},
	'check FIRMWARE_VERSION - decode': function(test) {
		test.done();
	},
	'check WIFI_STATUS - decode': function(test) {
		var wifiData = {
			2900: 'Associated',
			2901: 'Associating',
			2902: 'Association Failed',
			2903: 'Un-Powered',
			2904: 'Booting Up',
			2905: 'Could Not Start',
			2906: 'Applying Settings',
			2907: 'DHCP Started',
			2908: 'Unknown',
			2909: 'Other'
		};
		var vals = Object.keys(wifiData);

		var results = vals.map(function(val) {
			return data_parser.parseResult('WIFI_STATUS', parseInt(val, 10));
		});

		var reqResults = vals.map(function(val) {
			return {
				'register': 'WIFI_STATUS',
				'name': 'WIFI_STATUS',
				'address': 49450,
				'res': parseInt(val,10),
				'str': wifiData[val]
			};
		});
		test.deepEqual(results, reqResults);

		test.done();
	},
	'check FLOAT32 registers for rounding': function(test) {
		test.done();
	},
	'check AINx registers for high-precision rounding': function(test) {
		var ainValues = [
			{'val': 1, 'rounded': 1, 'unit': 'V'},
			{'val': 1.1234567, 'rounded': 1.1234567, 'unit': 'V'},
			{'val': 0.0123456, 'rounded': 0.0123456, 'unit': 'V'},
		];

		var results = ainValues.map(function(ainValue) {
			return data_parser.parseResult('AIN0', ainValue.val);
		});
		// console.log('Results', results);
		test.done();
	},
	'check POWER_ registers for text output': function(test) {
		test.done();
	},
	'check undefined register': function(test) {
		var cmds = [
			{'reg': 'DAC0', 'val': 2.123},
			{'reg': 1000, 'val': 2.123},
		];


		var results = cmds.map(function(cmd) {
			return data_parser.parseResult(cmd.reg, cmd.val);
		});

		console.log('Results', results);
		test.done();
	}
};