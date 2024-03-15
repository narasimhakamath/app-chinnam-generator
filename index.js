const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { green, bold, red } = require('colorette');

const getImageBuffer = async (options) => {
	const response = await axios.get(options.imageURL, { responseType: 'arraybuffer' });
	const buffer = Buffer.from(response.data, 'utf-8');
	return buffer;
};

const generateAndroidLauncherIcons = async (imageBuffer) => {
	try {
		const LAUNCHER_META_DATA = [
			{ file: 'ic_launcher_48x48.png', size: 48, rounded: false },
			{ file: 'ic_launcher_rounded_48x48.png', size: 48, rounded: true },
			{ file: 'ic_launcher_72x72.png', size: 72, rounded: false },
			{ file: 'ic_launcher_rounded_72x72.png', size: 72, rounded: true },
			{ file: 'ic_launcher_96x96.png', size: 96, rounded: false },
			{ file: 'ic_launcher_rounded_96x96.png', size: 96, rounded: true },
			{ file: 'ic_launcher_144x144.png', size: 144, rounded: false },
			{ file: 'ic_launcher_rounded_144x144.png', size: 144, rounded: true },
			{ file: 'ic_launcher_192x192.png', size: 192, rounded: false },
			{ file: 'ic_launcher_rounded_192x192.png', size: 192, rounded: true },
		];

		for (let androidIcon of LAUNCHER_META_DATA) {
			const roundedCorners = Buffer.from(`<svg><rect x="0" y="0" width="${androidIcon?.size}" height="${androidIcon?.size}" rx="${androidIcon?.size / 2}" ry="${androidIcon?.size / 2}"/></svg>`);

			let icon = await sharp(imageBuffer).resize(androidIcon?.size, androidIcon?.size);
			if(androidIcon?.rounded)
				icon = icon.composite([{ input: roundedCorners, blend: 'dest-in' }]);
			await icon.toFile(path.join(__dirname, androidIcon?.file));
		}

		console.log(
			green('✓'),
			bold(green('Generated Android launcher icons.'))
		);
	} catch(error) {
		console.log(
			red('✖'),
			bold(red('Generation of Android launcher icons failed.'))
		);
	}
};

const generateAndroidNotificationIcons = async (imageBuffer) => {
	try {
		const LAUNCHER_META_DATA = [
			{ file: 'ic_notification_48x48.png', size: 48, rounded: false },
			{ file: 'ic_notification_72x72.png', size: 72, rounded: false },
			{ file: 'ic_notification_96x96.png', size: 96, rounded: false },
			{ file: 'ic_notification_144x144.png', size: 144, rounded: false },
			{ file: 'ic_notification_192x192.png', size: 192, rounded: false },
		];

		for (let androidIcon of LAUNCHER_META_DATA) {
			const roundedCorners = Buffer.from(`<svg><rect x="0" y="0" width="${androidIcon?.size}" height="${androidIcon?.size}" rx="${androidIcon?.size / 2}" ry="${androidIcon?.size / 2}"/></svg>`);

			let icon = await sharp(imageBuffer).resize(androidIcon?.size, androidIcon?.size);
			if(androidIcon?.rounded)
				icon = icon.composite([{ input: roundedCorners, blend: 'dest-in' }]);
			await icon.toFile(path.join(__dirname, androidIcon?.file));
		}

		console.log(
			green('✓'),
			bold(green('Generated Android notification icons.'))
		);
	} catch(error) {
		console.log(
			red('✖'),
			bold(red('Generation of Android notification icons failed.'))
		);
	}
};

const generateAndroidIcons = async (imageBuffer, androidOptions) => {
	if(androidOptions?.launcher)
		await generateAndroidLauncherIcons(imageBuffer);

	if(androidOptions?.notification)
		await generateAndroidNotificationIcons(imageBuffer);
};

const generateIcons = async (options) => {
	try {
		const imageBuffer = await getImageBuffer(options);

		if('android' in options)
			await generateAndroidIcons(imageBuffer, options?.android);

	} catch(error) {
		console.log(
			red('✖'),
			bold(red('Failed to run the script.'))
		);
	}
};

module.exports = generateIcons;