import system_timezone from './index.js';
// you would do: import system_timezone from 'system-timezone';

// This is a slow, sync call.  It would be best to call it once at boot and cache the response
// If a timezone cannot be determined, an Error will be thrown.
const thisTimezone = system_timezone();

console.log(thisTimezone); // America/Los_Angeles