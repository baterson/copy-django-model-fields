// /* global suite, test */
const assert = require('assert')
const ext = require('../extension')

suite('Extension Tests', function() {
    const modelString = `
    class A(models.Model):
        text = models.TextField()
        title=models.CharField(
            blank=True,

        )
        author = ForeignKey(
            User,
            on_delete=models.CASCADE
        )
        underscore___10     =   models.TextFIeld()
    `
    const expected = ['text', 'title', 'author', 'underscore___10']

    test('parseModelString', function() {
        assert.deepEqual(ext.parseModelString(modelString), expected)
    })
})
