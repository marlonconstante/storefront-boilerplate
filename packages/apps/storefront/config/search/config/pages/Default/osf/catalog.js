/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/**
 * OSF-specific custom Guided Search page configuration which illustrates:
 * (1) Use of "results.attributes" to request only what is required by the PLP widgets, thereby
 *     drastically reducing the search response size
 * (2) Use of "results.childRecordAttributes" to include matching SKU level data (child records)
 *     per product in the search response.
 *
 * Use the `occ upload-search-config` command to upload this configuration
 * to the OCX Admin server. The configuration will be available in the
 * Preview context, and you will need to perform a Publish to apply it to
 * the Live context.
 */
module.exports = {
  contentType: 'Page',

  // The type of Guided Search configuration. This should always be set to "page".
  'ecr:type': 'page',

  contentItem: {
    // "@type" must always be set to "GuidedSearchService" for this Guided Search page configuration.
    '@type': 'GuidedSearchService',

    // "@appFilterState" is a global "FilterState" component. This component is used to specify the
    //                   various filters that are to be applied across all components like "ResultsList" and
    //                   "NavigationContainer".
    //
    // hiddenNavigationFilter: used to define a refinement that is applied behind the scenes.
    //                         This refinement will not be visible to the shopper.
    //
    // @type: must always be set to "FilterState" to identify a filter state component.
    //
    // recordFilters: used for filtering the results. For example, you can use record filters to
    //                restrict the set of results returned to only those in the current catalog that are active.
    //
    // rollupKey: is somewhat equivalent to a "group by" expression in SQL--except that it adjusts ALL features
    //            in the search response to reflect that grouping.
    //            For example, facet value counts will be based on the "rolled up" result records, results list
    //            will display rolled up records, etc.
    //
    /* eslint-disable no-template-curly-in-string */
    '@appFilterState': {
      '@type': 'FilterState',
      hiddenNavigationFilter: '${catalogDimensionValueId}',
      recordFilters: ['product.active:1', 'sku.active:1', 'product.catalogId:${catalogId}'],
      rollupKey: 'sku.listingId'
    },
    /* eslint-enable no-template-curly-in-string */

    // "facets" is a "NavigationContainer" component. This component will be dynamically populated
    //          with applicable and available facets (a.k.a. refinements) and facet values.
    //          Note that the key "facets" is arbitrary. You can rename it to anything (without key collisions).
    //
    // @type: must always be set to "NavigationContainer" to identify facets component.
    //
    // contentPaths : an advanced configuration, leave this as is.
    //
    facets: {
      '@type': 'NavigationContainer',
      contentPaths: ['/content/facets']
    },

    // "breadcrumbs" is a "Breadcrumbs" component. This component will be dynamically populated
    //               with breadcrumbs that represent the shoppers current search and navigation state.
    //               Note that the key "breadcrumbs" is arbitrary. You can rename it to anything (without key collisions).
    //
    // @type: must always be set to "Breadcrumbs" to identify a breadcrumbs component.
    breadcrumbs: {
      '@type': 'Breadcrumbs'
    },

    // "results" is a "ResultsList" component. This component will be dynamically populated with
    //           a list of records that match the combined URL parameter filters and application filter state.
    //           Note that the key "results" is arbitrary. You can rename it to anything (without key collisions).
    //
    // @type: must always be set to "ResultsList" to identify a results list component.
    //
    // recordsPerPage (Nrpp): the default number of records per page that will be returned.
    //                        This can be configured here or overridden with an 'Nrpp' URL parameter.
    //
    // attributes: specifies the record (product) level attributes that should be returned in the results list.
    //
    // childRecordAttributes: specifies the child record level attributes (SKU level data per product) that
    //                        should be returned in the results list.
    //
    // maxChildRecords: If the application filter state ("@appFilterState") is configured with a 'rollupKey',
    //                  then this setting will determine how many child records (SKUs) should be returned for
    //                  each aggregated record (product).
    //                  There are three possible values for this setting:
    //                    1 : one child record (recommended)
    //                    0 : zero child records (use this if no child records are needed)
    //                    -1 : all matching child records (not recommended for performance reasons)
    //
    //                  Setting 'maxChildRecords' to -1 will have a performance impact on search in terms of
    //                  both response time and response payload size. It is therefore recommended to use
    //                  the 'attributes' and 'childRecordAttributes' settings in conjunction to minimize any
    //                  response size.
    results: {
      '@type': 'ResultsList',
      maxChildRecords: -1,
      recordsPerPage: 16,
      attributes: [
        'product.displayName',
        'product.primaryFullImageURL',
        'product.primaryImageAltText',
        'product.repositoryId',
        'product.route',
        // This application configures a custom product property that the ProductResultColorSwatches
        // and ProductVariantOptions widgets can use to display color swatch images.
        'product.x_swatchMapping',
        'sku.listingFullImageURL',
        'sku.listingId',
        'sku.maxActivePrice',
        'sku.minActivePrice',
        'sku.repositoryId'
      ],
      childRecordAttributes: [
        'sku.activePrice',
        // This application configures a custom sku property that the ProductResultColorSwatches
        // and ProductVariantOptions widgets can use to determine the color of a sku.
        'sku.color',
        'sku.listPrice',
        'sku.salePrice',
        'sku.listingFullImageURL'
      ],
      rankingRules: {
        merchRulePaths: ['/content/rankingRules'],
        systemRulePaths: ['/content/system/rankingRules'],
        systemRuleLimit: 10
      }
    },

    // "searchAdjustments" is a "SearchAdjustments" component. This component will be dynamically populated with
    //                     info about any search term adjustments that were done to a given search request.
    //                     Note that the key "searchAdjustments" is arbitrary. You can rename it to anything (without key collisions).
    //
    // @type: must always be set to "SearchAdjustments" to identify a search adjustments component.
    searchAdjustments: {
      '@type': 'SearchAdjustments'
    }
  }
};
