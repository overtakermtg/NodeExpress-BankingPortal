const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

describe('Create `profile` view', () => {
  it('should create the profile view @profile-ejs-create-view', () => {
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/views/profile.ejs'), 'utf8');
      ejs.compile(file);
    } catch (err) {
      assert(err.code !== 'ENOENT', 'The `profile.ejs` view file does not exist.');
      const errorMessage = err.message.substring(0, err.message.indexOf('compiling ejs') - 1);
      assert(err.message.indexOf('compiling ejs') < -1, `${errorMessage} compiling profile.ejs`);
    }
    assert(/<%-\s+include\(('|")header(\.ejs)?('|")\)(;)?\s*%>/.test(file), 'Have you included the `header` view?');
    assert(/<h1>\s*Profile\s*<\/h1>/.test(file), 'The title `<h1>` element seems to be missing.');
    assert(/<%=\s*users.name\s*%>/.test(file), 'The users name is not displayed.');
    assert(/<%=\s*users.username\s*%>/.test(file), 'The users username is not displayed.');
    assert(/<%=\s*users.phone\s*%>/.test(file), 'The users phone is not displayed.');
    assert(/<%=\s*users.email\s*%>/.test(file), 'The users email is not displayed.');
    assert(/<%=\s*users.address\s*%>/.test(file), 'The users address is not displayed.');
    assert(
      /<a\s+href=('|")?\/('|")?>(.*)<\/a>/.test(file),
      'A link to the Account Summary seems to be missing.'
    );
    assert(/<%-\s+include\(('|")footer(\.ejs)?('|")\)(;)?\s*%>/.test(file), 'Have you included the `footer` view?');
  });
});
