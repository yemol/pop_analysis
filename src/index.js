import siteHandle from './lib/SiteHandle'
import config from './config'
import tools from './lib/tools'


for(let index in config.sites){
	siteHandle.add(config.sites[index])
}
// start processing to get site visited info
siteHandle.start(() => {
	// callback method for all sites are done.
	tools.log.info("All sites are finished!")
})
