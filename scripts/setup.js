#!/usr/bin/env node

/**
 * Portfolio Setup Script
 * Helps users customize their portfolio with their own information
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log(colorize('\n🚀 Portfolio Setup Wizard', 'cyan'));
  console.log(colorize('================================\n', 'cyan'));
  
  console.log('This wizard will help you customize your portfolio with your personal information.\n');
  
  try {
    // Collect user information
    const userInfo = {};
    
    userInfo.name = await askQuestion(colorize('What\'s your full name? ', 'yellow'));
    userInfo.title = await askQuestion(colorize('What\'s your job title? (e.g., Full Stack Developer) ', 'yellow'));
    userInfo.email = await askQuestion(colorize('What\'s your email address? ', 'yellow'));
    userInfo.phone = await askQuestion(colorize('What\'s your phone number? (optional) ', 'yellow'));
    userInfo.location = await askQuestion(colorize('Where are you located? (e.g., San Francisco, CA) ', 'yellow'));
    userInfo.tagline = await askQuestion(colorize('What\'s your tagline? ', 'yellow'));
    userInfo.description = await askQuestion(colorize('Write a brief description about yourself: ', 'yellow'));
    
    // Social links
    console.log(colorize('\n📱 Social Media Links (optional):', 'blue'));
    userInfo.github = await askQuestion(colorize('GitHub username: ', 'yellow'));
    userInfo.linkedin = await askQuestion(colorize('LinkedIn username: ', 'yellow'));
    userInfo.twitter = await askQuestion(colorize('Twitter username: ', 'yellow'));
    
    // EmailJS configuration
    console.log(colorize('\n📧 EmailJS Configuration (for contact form):', 'blue'));
    console.log('To enable the contact form, you\'ll need to set up EmailJS:');
    console.log('1. Go to https://emailjs.com and create an account');
    console.log('2. Create a service and template');
    console.log('3. Enter the details below (or leave blank to configure later):\n');
    
    userInfo.emailServiceId = await askQuestion(colorize('EmailJS Service ID: ', 'yellow'));
    userInfo.emailTemplateId = await askQuestion(colorize('EmailJS Template ID: ', 'yellow'));
    userInfo.emailPublicKey = await askQuestion(colorize('EmailJS Public Key: ', 'yellow'));
    
    // Google Analytics
    console.log(colorize('\n📊 Analytics (optional):', 'blue'));
    userInfo.gaTrackingId = await askQuestion(colorize('Google Analytics Tracking ID: ', 'yellow'));
    
    // Update constants file
    console.log(colorize('\n🔧 Updating configuration...', 'blue'));
    
    const constantsPath = path.join(__dirname, '..', 'src', 'data', 'constants.js');
    let constantsContent = fs.readFileSync(constantsPath, 'utf8');
    
    // Replace placeholder values
    constantsContent = constantsContent
      .replace(/name: "John Doe"/, `name: "${userInfo.name}"`)
      .replace(/title: "Full Stack Developer"/, `title: "${userInfo.title}"`)
      .replace(/email: "john.doe@example.com"/, `email: "${userInfo.email}"`)
      .replace(/phone: "\+1 \(555\) 123-4567"/, `phone: "${userInfo.phone || '+1 (555) 123-4567'}"`)
      .replace(/location: "San Francisco, CA"/, `location: "${userInfo.location}"`)
      .replace(/tagline: "Crafting digital experiences with modern technologies"/, `tagline: "${userInfo.tagline}"`)
      .replace(/description: "I'm a passionate full-stack developer.*?"/, `description: "${userInfo.description}"`)
      .replace(/github: "https:\/\/github\.com\/johndoe"/, userInfo.github ? `github: "https://github.com/${userInfo.github}"` : 'github: "https://github.com/johndoe"')
      .replace(/linkedin: "https:\/\/linkedin\.com\/in\/johndoe"/, userInfo.linkedin ? `linkedin: "https://linkedin.com/in/${userInfo.linkedin}"` : 'linkedin: "https://linkedin.com/in/johndoe"')
      .replace(/twitter: "https:\/\/twitter\.com\/johndoe"/, userInfo.twitter ? `twitter: "https://twitter.com/${userInfo.twitter}"` : 'twitter: "https://twitter.com/johndoe"')
      .replace(/serviceId: "your_service_id"/, `serviceId: "${userInfo.emailServiceId || 'your_service_id'}"`)
      .replace(/templateId: "your_template_id"/, `templateId: "${userInfo.emailTemplateId || 'your_template_id'}"`)
      .replace(/publicKey: "your_public_key"/, `publicKey: "${userInfo.emailPublicKey || 'your_public_key'}"`);
    
    // Update the favicon/logo initials
    const initials = userInfo.name.split(' ').map(name => name[0]).join('');
    constantsContent = constantsContent.replace(/JD/g, initials);
    
    fs.writeFileSync(constantsPath, constantsContent);
    
    // Update App.jsx with GA tracking ID
    if (userInfo.gaTrackingId) {
      const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
      let appContent = fs.readFileSync(appPath, 'utf8');
      appContent = appContent.replace(/const trackingId = 'GA_TRACKING_ID';/, `const trackingId = '${userInfo.gaTrackingId}';`);
      fs.writeFileSync(appPath, appContent);
    }
    
    // Update manifest.json
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    let manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    manifest.name = `${userInfo.name} - Portfolio`;
    manifest.short_name = `${userInfo.name} Portfolio`;
    manifest.description = userInfo.description;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    // Update HTML title
    const htmlPath = path.join(__dirname, '..', 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    htmlContent = htmlContent
      .replace(/<title>.*?<\/title>/, `<title>${userInfo.name} - ${userInfo.title} | Portfolio</title>`)
      .replace(/content="Full Stack Developer.*?"/, `content="${userInfo.description}"`)
      .replace(/content="Your Name"/, `content="${userInfo.name}"`);
    fs.writeFileSync(htmlPath, htmlContent);
    
    console.log(colorize('\n✅ Setup completed successfully!', 'green'));
    console.log(colorize('\n📋 Next steps:', 'cyan'));
    console.log('1. Add your profile photo to the public folder');
    console.log('2. Update your projects in src/data/constants.js');
    console.log('3. Add your skills and experience');
    console.log('4. Replace placeholder images with your project screenshots');
    console.log('5. Set up EmailJS for the contact form (if not done already)');
    console.log('6. Add your resume PDF to the public folder');
    
    console.log(colorize('\n🚀 Run "npm run dev" to start the development server!', 'green'));
    
  } catch (error) {
    console.error(colorize(`\n❌ Error: ${error.message}`, 'red'));
  } finally {
    rl.close();
  }
}

main();
