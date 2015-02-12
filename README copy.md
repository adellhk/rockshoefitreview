# Sinatra Url Shortener

## Learning Competencies

* Test-driven development using rspec and [rack-test][]
* Map the flow of data through a web application
* Use redirect
* Use Active Record callbacks
* Implement a user authorization scheme to limit unauthorized access to specific pages in a web application
* Deploy your application to Heroku

## Summary

We're going to build a simple link shortener, a la [bitly][].

You'll have one model named `Url`. The table for this model stores a list of 
URLs that people have entered.

## Releases

### Release 0: Simple Shortener

Start with the empty Sinatra skeleton.

We have one resource: `Urls`.  For our controllers, we have a route that lists
`Url` objects and another route that, when POSTed to, creates a `Url` object.

Let's test-drive these routes! 

Create a file in the `spec/` directory that corresponds to your controller. 
Maybe call it something like `index_controller_spec.rb`. Open this file in your 
editor and write a controller spec for `GET /urls` using the syntax provided by
[rack-test][]. The [Sinatra testing documentation][] also has documentation
about how to test a controller.

Write a failing test first. After you've made it pass by implementing the route,
write a failing test for the `POST /urls` route. Keep the 

1. Given
2. When
3. Then

steps in mind, since they'll help you set up the test for your POST route. Here's
the general format for an empty controller test:

```ruby
require 'spec_helper'
describe "index_controller" do
  # specs go here!
end
```

We'll also need a route that redirects us to the full (unshortened) URL. As 
always, write a test first.  If you've never used bitly, use it now to get a 
feel for how it works.

Now that you've written tested controllers, the controller methods should look 
like this:

```ruby
get '/' do
  # let user create new short URL, display a list of shortened URLs
end

post '/urls' do
  # create a new Url
end

# e.g., /q6bda
get '/:short_url' do
  # redirect to appropriate "long" URL
end
```

Use a `before_save` callback in the `Url` model to generate the short URL.
**Write a test** for the model method you created that generates the short URL,
but don't worry about testing that the `before_save` callback fires. We'll trust 
that ActiveRecord has been thoroughly tested.

### Release 1:  Add a Counter!

Add a `click_count` field to your `urls` table, which keeps track of how many
times someone has visited the shortened URL.  Add code to the appropriate place
in your controller code so that any time someone hits a short URL the counter
for the appropriate `Url` is incremented by 1. You can (and should) also write 
a test for this.

### Release 2: User Authentication

Now it's time for things to get complicated. Let's implement a login and logout
feature for our URL shortener!

The core flow of the app should remain the same, however a person might choose
to log in or create an account. In the event that they're logged in when they shorten
a URL, this `Url` should now be associated with their user account.  In other words,
a `Url` belongs to a `User` and a `User` has many `Urls`.

**Note**: Don't worry about implement the above user-centric logic yet.  First
get all the URL shortening and user authentication code working.  **Feel free to 
spike on this** and forego TDD while you figure out user authentication, we'll 
come back to repair broken tests in a bit. Make sure people can log in and can 
shorten URLs regardless of whether they're logged in or not.

There's going to be a lot going on in your controller! Try to keep the code as
readable and organized as possible. A file structure like this might make sense:

1. `app/controllers/urls.rb`, which contains the routes related to listing, creating, and redirecting `Url` objects
2. `app/controllers/sessions.rb`, which contains the routes related to logging in and logging out
3. `app/controllers/users.rb`, which contains the routes related to creating, displaying, and editing users

### Release 3: Conditional Logic

Now that you've got basic user authentication and URL shortening working, it's
time to stitch these features together. Depending on whether a user is signed
in, your site will change dynamically.

People should be able to create short URLs regardless of whether they're logged
in or not (that is, the `user_id` field on the `urls` table could possibly be
`NULL`).

However, if a user *is* logged in, when we create a URL it should set the
`user_id` to whatever the `user_id` of the currently logged-in user is.  This
information *should not* be a part of the form that a user submits &mdash; it
would be trivial for someone to change the content of the form and submit as
any user. The information should, instead, be stored in the users' sessions.

Users should now be able to view their URLs on their profile page, which should
look like this:

```ruby
get '/users/:id' do
end
```

This should display a user's profile, which lists all the links that a 
particular user has created.  If I'm viewing my *own* profile page, show the 
number of clicks next to each link so I can see how awesome my link-sharing 
skills are.

Since you'll be checking the session in every route, your routes are probably pretty
repetetive. But theres a better way! You can create helper methods to DRY up your
controller and view code. You could use something like this:

```ruby
helpers do
  # This will return the current user, if they exist
  # Replace with code that works with your application
  def current_user
    if session[:user_id]
      @current_user ||= User.find_by_id(session[:user_id])
    end
  end

  # Returns true if current_user exists, false otherwise
  def logged_in?
    !current_user.nil?
  end
end
```

Your controller can now call `current_user` to get the currently authenticated
user, if they exist.  This means we don't have to rely on user-submitted data
to determine what user created a short URL.



### Release 4: Fix Your Broken Tests and Write New Ones!
All of this dynamic content has probably caused your tests to break. But that's
ok! They can be fixed! You can fake a user's session using rack-test. The 'GET'
and 'POST' methods take an optional third argument that corresponds to the 
rack environment hash (where information about sessions is stored). It looks
something like this:

```ruby
it "should create a new post" do
  fake_params = { title: "some title", content: "some content" }
  fake_session = { 'rack.session' => { user_id: 20 } }
  expect{
    post '/some_route', fake_params, fake_session
  }.to change{ Post.count }.by(1)
end
```

You should also write tests to check each branch of your conditionals (if/else)
that correspond to user authentication.


### Release 5: Add Validations (Optional)

Test-drive adding a validation to your `Url` model so that only `Urls` with 
valid URLs are saved to the database. Read up on [ActiveRecord validations][].
You can use ActiveRecord's `valid?` instance method in your test to check if 
the validations are working.

What constitutes a "valid URL" is up to you.  It's a sliding scale, from
validations that would permit lots of invalid URLs to validations that might
reject lots of valid URLs.  When you get into it you'll see that expressing the
fact "x is a valid URL" in Ruby Land or SQL Land is never perfect.

For example, the valid URL could range across:

**A valid URL is...**

* Any non-empty string
* Any non-empty string that starts with "http://" or "https://"
* Any string that the [Ruby URI module][URI module] says is valid
* Any URL-looking thing which responds to a HTTP request, i.e., we actually check to see if the URL is accessible via HTTP

Some of these are easily expressible in SQL Land. Some of these are hard to
express in SQL Land, but ActiveRecord comes with pre-built validation helpers
that make it easy to express in Ruby Land. Others require [custom
validations][] that express logic unique to our application domain.

The rule of thumb is that where we can, we want to always express constraints
in Ruby Land and also express them in SQL Land where feasible.


### Release 6: Add Error Handling (Optional)

When you try to save (create or update) an ActiveRecord object that has invalid
data, ActiveRecord will fail. Some methods like `create!` and `save!` throw an
exception. Others like `create` (without the `!`, the bang) return the resulting
object whether the object was saved successfully to the database or not, while
`save` will return `false` if `perform_validation` is true and any validations
fail. See [create][] and [save][] for more information.

Remember, you can call [valid? or invalid?][valid invalid] on an ActiveRecord
object to see whether its data is valid or invalid.

Use `valid?`, `invalid?`, and the [errors][] method to display a helpful error message if a user
enters an invalid URL. This will give them a change to correct their error.

## Optimize Your Learning

### More on Validations, Constraints, and Database Consistency

We often want to put constraints on what sort of data can go into our database.
This way we can guarantee that all data in the database conforms to certain
standards, e.g., there are no users missing an email address.  Guarantees of
this kind &mdash; ensuring that the data in our database is never confusing or
contradictory or partially changed or otherwise invalid &mdash; are called
**consistency**.

If we think of this as a fact from Fact Land, these constraints look like:

* A user must have a first\_name
* A user must have an email
* Two user's can't have the same email address, or equivalently, each user's email must be unique
* A Craigslist post's URL must be a valid URL, for some reasonable definition of valid

These facts can be recorded in both SQL Land and in Ruby Land, like this:

<table class="table table-bordered table-striped">
  <tr>
    <th>Fact Land</th>
    <th>SQL Land</th>
    <th>Ruby Land</th>
  </tr>
  <tr>
    <td>A user must have an email address</td>
    <td><code>NOT NULL</code> constraint on <code>email</code> field</td>
    <td><code>validates :email, :presence => true</code></td>
  </tr>
  <tr>
    <td>A user must have a first name</td>
    <td><code>NOT NULL</code> constraint on <code>first_name</code> field</td>
    <td><code>validates :first_name, :presence => true</code></td>
  </tr>
  <tr>
    <td>A user's email address must be unique</td>
    <td><code>UNIQUE INDEX</code> on <code>email</code> field</td>
    <td><code>validates :email, :uniqueness => true</code></td>
  </tr>
</table>

### Release 7: Deployment (Optional)

You're feature complete with 100% test coverage. It's time to push this thing into
production! Get the app up on Heroku, and call it a night.

## Resources

* [Bit.ly, a url shortening service][bitly]
* [ActiveRecord validations][]
* [URI module][]
* [Active record custom validations][custom validations]
* [ActiveRecord create][create]
* [ActiveRecord save][save]
* [ActiveRecord's valid? &amp; invalid?][valid invalid]
* [ActiveRecord's errors object][errors]
* [HTTP status codes][]
* [HTTP status cats][]

[bitly]: http://bitly.com/
[ActiveRecord validations]: http://guides.rubyonrails.org/active_record_validations.html
[URI module]: http://www.ruby-doc.org/stdlib-1.9.3/libdoc/uri/rdoc/URI.html
[custom validations]: http://guides.rubyonrails.org/active_record_validations.html#performing-custom-validations
[create]: http://apidock.com/rails/ActiveRecord/Base/create/class
[Sinatra testing documentation]: http://www.sinatrarb.com/testing.html#rspec
[save]: http://apidock.com/rails/ActiveRecord/Base/save
[valid invalid]: http://guides.rubyonrails.org/active_record_validations.html#valid-questionmark-and-invalid-questionmark
[errors]: http://guides.rubyonrails.org/active_record_validations.html#validations-overview-errors
[HTTP status codes]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
[HTTP status cats]: http://httpcats.herokuapp.com/
[rack-test]: https://github.com/brynary/rack-test#readme
