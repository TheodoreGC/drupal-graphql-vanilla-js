# Drupal GraphQL Vanilla JS
This repo intend to demonstrate how you can use Drupal with GraphQL and Automatic Persisted Queries modules with Apollo Client using **only** vanilla Javascript. 

## SETUP - CMS
### Setup the Virtual Machine
Go [here](https://github.com/geerlingguy/drupal-vm) and follow the instruction to install and run your drupal VM. Once you are done, make sure to follow these extra steps:
#### Install APQ Drupal Module
git clone this [repo](https://github.com/lucasconstantino/drupal-graphql-apq) inside your `[YOUR_DRUPAL_FOLDER]/web/modules/contrib/graphql/modules` folder.

#### Update Drupal's CORS configuration
In your terminal, execute the following command:

`cp [YOUR_DRUPAL_FOLDER]/web/sites/default/default.services.yml [YOUR_DRUPAL_FOLDER]/web/sites/default/services.yml`

then,
`nano [YOUR_DRUPAL_FOLDER]/web/sites/default/services.yml`

Find the Cross-Site HTTP requests section (end of file) and make sure it is like the following:

```yml
cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders: ['x-csrf-token','authorization','content-type','accept','origin','x-requested-with']
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: ['*']
    # Configure requests allowed from specific origins.
    allowedOrigins: ['*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: false
    # Sets the Access-Control-Max-Age header.
    maxAge: false
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: false
```

Execute `vagrant provision` for updating your VM.

### Enable the necesary modules
Access your local instance [here](http://drupalvm-test) and login. Click on "Manage" tab and then "Extend". Look for the GraphQL section and make sure `GraphQL`, `GraphQL APQ` and `GraphQL Core` are enabled.

### Enable permissions
Click on "Manage" tab, then "People" and finally the "Permissions" tab.
Look for the GraphQL section and make sure `Execute arbitrary GraphQL requests` and `Execute persisted GraphQL requests` are enabled for anonymous users and authenticated users.

### Create content
Click on "Manage" tab, then "Content" and "Add content". Choose your content type and for simplicity, mention a title and a URL alias (which you will use later).

### Rebuild your cache
Type `vagrant ssh` and once your bash is prompted, execute the following command within `[YOUR_DRUPAL_FOLDER]/web`:
`../vendor/bin/drush cr`

## SETUP - CLIENT
### Installation
Do `npm install`

### Update your GraphQL Query
Go to `./queries/getNode.graphql` and change `"article"` (l. 14) to the path you added during your content creation before.

### Build
Do `npm build`

### Running
Do `npm start`

Once viewing the page, check the developer console. You should be able to see the response of the call to the CMS.

You have now setup successfully your environment. You might want to check the `cms-service` for more details about how it works on the client side.