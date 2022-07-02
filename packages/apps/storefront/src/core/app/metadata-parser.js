/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
/* eslint-disable */
import * as reactDocs from 'react-docgen';
import fs from 'fs';
import path from 'path';

const includeRefs = obj => {
  const keyArray = Object.keys(obj);
  for (const index in keyArray) {
    if (obj[keyArray[index]] !== null && typeof obj[keyArray[index]] !== 'undefined' && obj[keyArray[index]]['$ref']) {
      const schemaPath = obj[keyArray[index]]['$ref'].substring(0, obj[keyArray[index]]['$ref'].indexOf('#'));
      let referenceSchema = {};
      if (schemaPath) {
        // eslint-disable-next-line
        referenceSchema = require(schemaPath);
      }

      const jsonPath = obj[keyArray[index]]['$ref'].substring(obj[keyArray[index]]['$ref'].indexOf('#') + 1);
      const jsonPathArray = jsonPath.split('/');
      jsonPathArray.forEach(element => {
        if (element !== '') referenceSchema = referenceSchema[element];
      });

      obj[keyArray[index]] = referenceSchema;
      //can 'continue' here
    }

    if (typeof obj[keyArray[index]] === 'object' && obj[keyArray[index]] !== null) {
      includeRefs(obj[keyArray[index]]);
    }
  }
};

const fetchSchema = schemaPath => {
  let schema = {};

  if (schemaPath) {
    try{
      schema = require(schemaPath);
    }
    catch (err) {
      console.error(`schema fetch error: ${err}` );
    }
  }
  const {properties, patternProperties} = schema;

  if (properties) includeRefs(properties);
  if (patternProperties) includeRefs(patternProperties);

  return schema;
};

const sortByName = (a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

const getKey = packageId => {
  if (!packageId) {
    return 'error';
  }

  return packageId.substring(packageId.indexOf('/') + 1);
};

const getSubscribers = meta => {
  const {subscribers = {}} = meta;
  let newSubscriber = {};
  const subscribersJson = {
    subscribers: {}
  };
  // for (const [SubCategoryName, SubCategory] of Object.entries(subscribers)) {
  for (const [key, subscriber] of Object.entries(subscribers)) {
    newSubscriber = {
      name: key,
      ...subscriber
    };

    // newSubscribers.sort(sortByName);
    const subscribersKey = getKey(subscriber.packageId);
    subscribersJson.subscribers[subscribersKey] = [
      ...(subscribersJson.subscribers[subscribersKey] || []),
      newSubscriber
    ];
    // newSubscribers = [];
  }

  return subscribersJson;
};

const getComponents = (meta, appName) => {
  let {components = {}, packageId} = meta;
  packageId = packageId.substring(0, packageId.indexOf("/"));
  let newComponent = {};
  const componentsJson = {
    components: {}
  };

  //Creating map for app level style overrides of component styles
  const pathPackageJson = packageId + '/' + appName + "/package.json"; 
  const appLevelPackageJson = fetchSchema(pathPackageJson);
  const aliases = appLevelPackageJson.occ.aliases? appLevelPackageJson.occ.aliases : {};
  let aliasesMap = new Map();
  Object.keys(aliases).forEach(keyPath => {
    
    if(keyPath.indexOf(packageId + '/styles') < 0 ) {
      const splitString = keyPath.split("/");
      const key = splitString[splitString.length - 2]; 
      aliasesMap.set( key, aliases[keyPath] );  
    }
  });


  const getDirs = source => fs.readdirSync(source, {withFileTypes: true}).filter(dirent => dirent.isDirectory());


  const parseWidget = (componentPath, componentExtension) => {
    componentPath = componentPath.replace(/\\/g, "/");
    const componentDocs = {};

    if( fs.existsSync(componentPath)){
      getDirs(componentPath).forEach(dir => {
        const subComponentPath = `${componentPath}/${dir.name}`;
        getDirs(subComponentPath).forEach(subDir => {
          const sourcePath = `${subComponentPath}/${subDir.name}/${componentExtension}`;
          if (fs.existsSync(sourcePath)) {
            try {
              const sourceString = fs.readFileSync(sourcePath, 'utf8');
              //const comments = parse(sourceString);
              //const parsedAnnotations = parseComments(comments);
              const componentInfo = reactDocs.parse(sourceString, reactDocs.resolver.findAllComponentDefinitions);
              let widgetStylePath = `${subComponentPath}/${subDir.name}/styles.css`;
              let widgetStyle = fs.existsSync(widgetStylePath) ? fs.readFileSync(widgetStylePath, 'utf8') : '';
              
              //Check for aliasing overrides for styles
              if( aliasesMap.has(subDir.name) ){
                widgetStylePath = aliasesMap.get(subDir.name);
                widgetStyle = fs.existsSync( require.resolve(widgetStylePath)) ? fs.readFileSync( require.resolve(widgetStylePath), 'utf8') : '';
              }
  
              componentInfo.forEach(info => {
                info.description = info.description.substring(0, info.description.indexOf("@") );
                if (info.props) {
                  Object.keys(info.props).forEach(prop => {
                    info.props[prop]['name'] = prop;
                  });
                }
                componentDocs[info.displayName] = {...info, widgetStyle};
              });
            } catch (error) {
              console.log(`unable to parse ${sourcePath}, due to ${error.message}`);
            }
          } else {
            console.log(`check the component path for ${sourcePath}`);
          }
        })
  
      } );
    }
    return componentDocs;
  };

  const parseComponent = (componentPath, componentExtension) => {
    componentPath = componentPath.replace(/\\/g, "/");
    const componentDocs = {};
    if( fs.existsSync(componentPath)){
      getDirs(componentPath).forEach(dir => {
        const sourcePath = `${componentPath}/${dir.name}/${componentExtension}`;
        if (fs.existsSync(sourcePath)) {
          try {
            const sourceString = fs.readFileSync(sourcePath, 'utf8');
            //const comments = parse(sourceString);
            //const parsedAnnotations = parseComments(comments);
            const componentInfo = reactDocs.parse(sourceString, reactDocs.resolver.findAllComponentDefinitions);
            const widgetStylePath = `${componentPath}/${dir.name}/styles.css`;
            const widgetStyle = fs.existsSync(widgetStylePath) ? fs.readFileSync(widgetStylePath, 'utf8') : '';
            componentInfo.forEach(info => {
              info.description = info.description.substring(0, info.description.indexOf("@") );
              if (info.props) {
                Object.keys(info.props).forEach(prop => {
                  info.props[prop]['name'] = prop;
                });
              }
              componentDocs[info.displayName] = {...info, widgetStyle};
            });
          } catch (error) {
            console.log(`unable to parse ${sourcePath}, due to ${error.message}`);
          }
        } else {
          console.log(`check the component path for ${sourcePath}`);
        }

    });

    }


    return componentDocs;
  };

  
  const getWidgetDocs = () => {
    
    let widgetsPath = '';
    try{
      widgetsPath = `${path.dirname(require.resolve( packageId +'/react-widgets'))}`;
    }
    catch(err)
    {
      console.error(`widget path error: ${err}`);
    }

    return parseWidget(widgetsPath, 'component.js');
  };

  const getComponentDocs = () => {
    let componentPath = '';
    try{
      componentPath = `${path.dirname(require.resolve( packageId + '/react-components/package.json'))}`;
    }catch(err){
      console.error(`widget path error: ${err}`);
    }
    return parseComponent(componentPath, 'index.js');
  };

  const componentDocs = {...getWidgetDocs()};
  // for (const [SubCategoryName, SubCategory] of Object.entries(components)) {
  for (const [key, component] of Object.entries(components)) {
    newComponent = {
      name: key,
      description: componentDocs[key] ? componentDocs[key].description : '',
      Props: componentDocs[key] ? componentDocs[key].props : {},
      styles: componentDocs[key] ? componentDocs[key].widgetStyle : {},
      ...component
    };
    // }

    const componentKey = getKey(component.packageId);
    componentsJson.components[componentKey] = [...(componentsJson.components[componentKey] || []), newComponent];
    componentsJson.components[componentKey].sort(sortByName);
  }

  //add info related to reactComponents separately as they are not in meta. 
/*
  const reactComponentDocs = {...getComponentDocs()};
  const newReactComponent = [];
  for (const [key] of Object.entries(reactComponentDocs)) {
    newReactComponent.push({
      name: key,
      packageId: '@oracle-cx-commerce/react-components',
      description: reactComponentDocs[key].description,
      Props: reactComponentDocs[key].props, //TODO make Props to props
      styles: reactComponentDocs[key].widgetStyle,
      actions: reactComponentDocs[key].actions,
      fetchers: reactComponentDocs[key].fetchers
    });
  }
  componentsJson.components.reactComponents = [...newReactComponent];
*/


  return componentsJson;
};

const getActions = meta => {
  const {actions = {}} = meta;
  let newAction = {};
  const actionsJson = {
    actions: {}
  };
  // for (const [SubCategoryName, SubCategory] of Object.entries(actions)) {
  for (const [key, action] of Object.entries(actions)) {
    const {input, output} = action;

    newAction = {
      name: key,
      ...action,
      inputSchema: {...fetchSchema(input)},
      outputSchema: {...fetchSchema(output)}
    };

    const actionsKey = getKey(action.packageId);
    actionsJson.actions[actionsKey] = [...(actionsJson.actions[actionsKey] || []), newAction];
  }

  // }

  return actionsJson;
};

const getEndpoints = meta => {
  const {endpoints = {}} = meta;
  let newEndpoint = {};
  const endpointsJson = {
    endpoints: {}
  };

  // for (const [SubCategoryName, SubCategory] of Object.entries(endpoints)) {
  for (const [key, endpoint] of Object.entries(endpoints)) {
    const {input, output} = endpoint;

    newEndpoint = {
      name: key,
      ...endpoint,
      inputSchema: {...fetchSchema(input)},
      outputSchema: {...fetchSchema(output)}
    };

    const endpointsKey = getKey(endpoint.packageId);
    endpointsJson.endpoints[endpointsKey] = [...(endpointsJson.endpoints[endpointsKey] || []), newEndpoint];
  }

  return endpointsJson;
};

const getFetchers = meta => {
  const {fetchers = {}} = meta;
  const newFetchers = [];

  for (const [key, fetcher] of Object.entries(fetchers)) {
    newFetchers.push({
      name: key,
      ...fetcher
    });
  }

  newFetchers.sort(sortByName);

  return newFetchers.length
    ? {
        fetchers: {
          fetchers: [...newFetchers]
        }
      }
    : [];
};

const getStyles = (meta, appName) => {
  let {components = {}, packageId} = meta;
  packageId = packageId.substring(0, packageId.indexOf("/"));
  let newStyles = [];

  const stylesJson = {
    styles: {}
  };
  const getDirs = source => fs.readdirSync(source, {withFileTypes: true}).filter(dirent => dirent.isDirectory());

  const parseStyles = (componentPath, componentExtension) => {
    componentPath = componentPath.replace(/\\/g, "/");
    const styleDocs = {};
    if( fs.existsSync(componentPath)){
      getDirs(componentPath).forEach(dir => {
        const subComponentPath = `${componentPath}/${dir.name}`;
        getDirs(subComponentPath).forEach(subDir => {
          const sourcePath = `${subComponentPath}/${subDir.name}/${componentExtension}`;
          if (fs.existsSync(sourcePath)) {
            try {
              const sourceString = fs.readFileSync(sourcePath, 'utf8');
              const componentInfo = reactDocs.parse(sourceString, reactDocs.resolver.findAllComponentDefinitions);
              const widgetStylePath = `${subComponentPath}/${subDir.name}/styles.css`;
              const widgetStyle = fs.existsSync(widgetStylePath) ? fs.readFileSync(widgetStylePath, 'utf8') : '';
              componentInfo.forEach(info => {
                if (info.props) {
                  Object.keys(info.props).forEach(prop => {
                    info.props[prop]['name'] = prop;
                  });
                }
                styleDocs[info.displayName] = {widgetStyle};
              });
            } catch (error) {
              console.log(`unable to parse ${sourcePath}, due to ${error.message}`);
            }
          } else {
            console.log(`check the component path for ${sourcePath}`);
          }
        })
  
      });
  
    }

    return styleDocs;
  };
  
  const parseCoreStyles = (coreStylesPath) => {
    coreStylesPath = coreStylesPath.replace(/\\/g, "/");
    const styleDocs = {};

    if( fs.existsSync(coreStylesPath)){
      fs.readdirSync(coreStylesPath).forEach(file => {
        var cssIndex = file.indexOf('.css');
        
        if(cssIndex >= 0) {
          const widgetStylePath = `${coreStylesPath}/${file}`;
          const widgetStyle = fs.existsSync(widgetStylePath) ? fs.readFileSync(widgetStylePath, 'utf8') : '';
    
          styleDocs[file] = {widgetStyle};
        }
      });  
    }

    return styleDocs;
  }

  //TODO: add styles for components as well
  /*
  const widgetsPath = `${path.dirname(require.resolve('@oracle-cx-commerce/react-widgets'))}`;
  const stylesDocs = {...parseStyles(widgetsPath, 'component.js')};
  */

  //adding common.css, desktop.css, moblie.css, theme.css
  let coreStylesPath = '';
  try{
    coreStylesPath = `${path.dirname(require.resolve( packageId+'/styles'))}`;
  }catch(err){
    console.error(`core styles path error: ${err}`);
  }
  const CoreStylesDocs = {...parseCoreStyles(coreStylesPath)};

  
  //checking for overrides in core styles
  const pathPackageJson = packageId + '/' + appName + "/package.json"; 
  const appLevelPackageJson = fetchSchema(pathPackageJson);
  const aliases = appLevelPackageJson.occ.aliases? appLevelPackageJson.occ.aliases : {};
  const CoreStyleDocsKeysArray = Object.keys(CoreStylesDocs);
  
  Object.keys(aliases).forEach(keyPath => {
    const key = /[^/]*$/.exec(keyPath)[0];
    if( CoreStyleDocsKeysArray.indexOf(key) >= 0 ) {
      CoreStylesDocs[key].widgetStyle = '';
      try{
        CoreStylesDocs[key].widgetStyle = fs.readFileSync(require.resolve(aliases[keyPath]), 'utf8')      
      }catch(err){
        console.error(`core styles path error: ${err}`);
      }
    }
  });


  //converting coreStyleDocs into array and populating stylesJson
  for (const [key] of Object.entries(CoreStylesDocs)) {
    newStyles.push({
      name: key,
      styles: CoreStylesDocs[key].widgetStyle 
    });
  }
  newStyles.sort(sortByName);
  stylesJson.styles['CoreStyles'] = [...newStyles];
  newStyles = [];


  //adding menu field for all the component styles - no need to populate it, we can get the data in the visualizer from the components section
  stylesJson.styles['Components'] = [{
    name: 'components',
    styles: ''
  }];

  return stylesJson;
}

export const parseMetaData = (meta, appName, getOriginAppName) => ({
  metadataRepository: {
    applications: {
      [appName]: {
        ...meta,
        ...getActions(meta),
        ...getComponents(meta, getOriginAppName()),
        ...getEndpoints(meta),
        ...getSubscribers(meta),
        ...getFetchers(meta),
        ...getStyles(meta, getOriginAppName()),
        name: appName
      }
    }
  }
});
