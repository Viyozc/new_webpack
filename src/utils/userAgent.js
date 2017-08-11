import UAParser from 'ua-parser-js'

let userAgent = UAParser(navigator.userAgent)
userAgent.device.isMobile = ((/mobile/i).test(navigator.userAgent) || (/iphone/i).test(navigator.userAgent) || (/android/i).test(navigator.userAgent))
userAgent.device.isIOS = (/iPad|iPhone|iPod/).test(navigator.userAgent)
userAgent.browser.isDingTalk = (/DingTalk/i).test(navigator.userAgent)
userAgent.browser.isWechatWebview = (/MicroMessenger/i).test(navigator.userAgent)
userAgent.browser.isAliplay = (/AlipayClient/i).test(navigator.userAgent)

export default userAgent
