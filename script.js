window.addEventListener('load', () => {
	[...document.getElementsByClassName('currentYear')]
	.forEach((e, i) => {
		e.textContent = new Date(Date.now()).getFullYear();
	});
});

window.addEventListener('load', () => {
	document.getElementById('download')
	.addEventListener('click', triggerDownload);

    document.getElementById('url')
    .addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            triggerDownload(e);
        }
    })
});

const triggerDownload = async e => {
    let url = document.getElementById('url').value;
    console.log(`Attempting the download of ${url}...`);
    
    /* try {
        url = new URL(url);
    } catch (e) {
        return console.log(`Error: Invalid URL!`);
    } */

    let response;
    try {
        response = await fetch(url);
    } catch (e) {
        return console.log(`Error: Request failed!`);
    }

    let blob;
    try {
        blob = await response.blob();
    } catch (e) {
        return console.log(`Error: Couldn't retrieve blob!`);
    }

    console.log(`Retrieved blob:`, blob);

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const extension = extensions[blob.type];
    link.download = extension != null ? `file.` + extension : 'file';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const extensions = {
	'text/html':                             'html',
    'text/css':                              'css',
    'text/xml':                              'xml',
    'image/gif':                             'gif',
    'image/jpeg':                            'jpeg',
    'application/x-javascript':              'js',
    'application/atom+xml':                  'atom',
    'application/rss+xml':                   'rss',

    'text/mathml':                           'mml',
    'text/plain':                            'txt',
    'text/vnd.sun.j2me.app-descriptor':      'jad',
    'text/vnd.wap.wml':                      'wml',
    'text/x-component':                      'htc',

    'image/png':                             'png',
    'image/tiff':                            'tif',
    'image/vnd.wap.wbmp':                    'wbmp',
    'image/x-icon':                          'ico',
    'image/x-jng':                           'jng',
    'image/x-ms-bmp':                        'bmp',
    'image/svg+xml':                         'svg',
    'image/webp':                            'webp',

    'application/java-archive':              'jar',
    'application/mac-binhex40':              'hqx',
    'application/msword':                    'doc',
    'application/pdf':                       'pdf',
    'application/postscript':                'ps',
    'application/rtf':                       'rtf',
    'application/vnd.ms-excel':              'xls',
    'application/vnd.ms-powerpoint':         'ppt',
    'application/vnd.wap.wmlc':              'wmlc',
    'application/vnd.google-earth.kml+xml':  'kml',
    'application/vnd.google-earth.kmz':      'kmz',
    'application/x-7z-compressed':           '7z',
    'application/x-cocoa':                   'cco',
    'application/x-java-archive-diff':       'jardiff',
    'application/x-java-jnlp-file':          'jnlp',
    'application/x-makeself':                'run',
    'application/x-perl':                    'pl',
    'application/x-pilot':                   'prc',
    'application/x-rar-compressed':          'rar',
    'application/x-redhat-package-manager':  'rpm',
    'application/x-sea':                     'sea',
    'application/x-shockwave-flash':         'swf',
    'application/x-stuffit':                 'sit',
    'application/x-tcl':                     'tcl',
    'application/x-x509-ca-cert':            'der',
    'application/x-xpinstall':               'xpi',
    'application/xhtml+xml':                 'xhtml',
    'application/zip':                       'zip',

    'application/octet-stream':              'bin',
    'application/octet-stream':              'deb',
    'application/octet-stream':              'dmg',
    'application/octet-stream':              'eot',
    'application/octet-stream':              'iso',
    'application/octet-stream':              'msi',

    'audio/midi':                            'mid',
    'audio/mpeg':                            'mp3',
    'audio/ogg':                             'ogg',
    'audio/x-realaudio':                     'ra',

    'video/3gpp':                            '3gpp',
    'video/mpeg':                            'mpeg',
    'video/quicktime':                       'mov',
    'video/x-flv':                           'flv',
    'video/x-mng':                           'mng',
    'video/x-ms-asf':                        'asx',
    'video/x-ms-wmv':                        'wmv',
    'video/x-msvideo':                       'avi',
    'video/mp4':                             'm4v'
};