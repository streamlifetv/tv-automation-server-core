import { PeripheralDeviceAPI } from '../../lib/api/peripheralDevice'
import { getCurrentTime, Collections } from '../../lib/lib'
import { Session } from 'meteor/session'
import * as _ from 'underscore'

// Note: These things are convenience functions to be used during development:

Meteor.startup(() => {
	_.each(Collections, (val, key) => {
		window[key] = val
	})
})

window['Collections'] = Collections
window['executeFunction'] = PeripheralDeviceAPI.executeFunction
window['getCurrentTime'] = getCurrentTime
window['Session'] = Session

function setDebugData () {
	Tracker.autorun(() => {
		let stats: any = {}
		_.each(Collections, (collection: any, name: string) => {
			stats[name] = collection.find().count()
		})
		console.log(_.map(stats, (count: any, name: string) => { return name + ': ' + count }).join('\n'))
	})
}
window['setDebugData'] = setDebugData
const debugData = false
if (debugData) {
	console.log('Debug: comment out this!')
	setDebugData()
}
