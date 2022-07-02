/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/**
 * Supplementary typeahead keyword records.
 *
 * Use the `occ upload-custom-typeahead-keywords` command to upload these
 * custom(supplemental) typeahead keyword records. They will become
 * available for search after the next indexing.
 */

module.exports = {
  items: [
    // {
    //   // Uncomment this "deleteAll" record to truncate existing
    //   // supplemental(custom) typeahead keyword records.
    //   'record.action': 'deleteAll'
    // },
    {
      'record.id': 'kw:shoes',
      'keyword.terms@locale:en': 'shoes',
      'keyword.searchable@locale:en': 'shoes',
      'keyword.score': '10000',
      'keyword.searchCount': '10000'
    },
    {
      'record.id': 'kw:shorts',
      'keyword.terms@locale:en': 'shorts',
      'keyword.searchable@locale:en': 'shorts',
      'keyword.score': '5000',
      'keyword.searchCount': '5000'
    },
    {
      'record.id': 'kw:shirts',
      'keyword.terms@locale:en': 'shirts',
      'keyword.searchable@locale:en': 'shirts',
      'keyword.score': '3000',
      'keyword.searchCount': '3000'
    },
    {
      'record.id': 'kw:t-shirts',
      'keyword.terms@locale:en': 't-shirts',
      'keyword.searchable@locale:en': 't-shirts',
      'keyword.score': '2000',
      'keyword.searchCount': '2000'
    },
    {
      'record.id': 'kw:boots',
      'keyword.terms@locale:en': 'boots',
      'keyword.searchable@locale:en': 'boots',
      'keyword.score': '8000',
      'keyword.searchCount': '8000'
    },
    {
      'record.id': 'kw:womens_boots',
      'keyword.terms@locale:en': "women's boots",
      'keyword.searchable@locale:en': "women's boots",
      'keyword.score': '7000',
      'keyword.searchCount': '7000'
    },
    {
      'record.id': 'kw:mens_boots',
      'keyword.terms@locale:en': "men's boots",
      'keyword.searchable@locale:en': "men's boots",
      'keyword.score': '3000',
      'keyword.searchCount': '3000'
    },
    {
      'record.id': 'kw:womens_shoes',
      'keyword.terms@locale:en': "women's shoes",
      'keyword.searchable@locale:en': "women's shoes",
      'keyword.score': '5000',
      'keyword.searchCount': '5000'
    },
    {
      'record.id': 'kw:mens_shoes',
      'keyword.terms@locale:en': "men's shoes",
      'keyword.searchable@locale:en': "men's shoes",
      'keyword.score': '2000',
      'keyword.searchCount': '2000'
    },
    {
      'record.id': 'kw:womens_shirts',
      'keyword.terms@locale:en': "women's shirts",
      'keyword.searchable@locale:en': "women's shirts",
      'keyword.score': '700',
      'keyword.searchCount': '700'
    },
    {
      'record.id': 'kw:mens_shirts',
      'keyword.terms@locale:en': "men's shirts",
      'keyword.searchable@locale:en': "men's shirts",
      'keyword.score': '300',
      'keyword.searchCount': '300'
    },
    {
      'record.id': 'kw:dresses',
      'keyword.terms@locale:en': 'dresses',
      'keyword.searchable@locale:en': 'dresses',
      'keyword.score': '7000',
      'keyword.searchCount': '7000'
    },
    {
      'record.id': 'kw:pants',
      'keyword.terms@locale:en': 'pants',
      'keyword.searchable@locale:en': 'pants',
      'keyword.score': '3000',
      'keyword.searchCount': '3000'
    },
    {
      'record.id': 'kw:skirts',
      'keyword.terms@locale:en': 'skirts',
      'keyword.searchable@locale:en': 'skirts',
      'keyword.score': '7000',
      'keyword.searchCount': '7000'
    },
    {
      'record.id': 'kw:jackets',
      'keyword.terms@locale:en': 'jackets',
      'keyword.searchable@locale:en': 'jackets',
      'keyword.score': '3000',
      'keyword.searchCount': '3000'
    }
  ]
};
