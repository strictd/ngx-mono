'use strict';

import { Router, Request, Response } from 'express';
import { fetchSource } from '../../../../_shared/config/controllers/db-config';

const debug = require('debug')('routing');

const router = Router();

router.get('/pdf-wysiwyg/forms/:form/versions(/:version)?', (req: Request, res: Response) => {
  const reqbody = req.body || {},
        params = req.params || {},
        form = params.form || '',
        version = params.version || '',
        source = fetchSource(req, req.app.locals.sources);

  source.pdf_wysiwyg.schema.getVersions(source.pdf_wysiwyg, form, version).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).send(err.message);
    debug('Error: %s', JSON.stringify(err));
  });
});

router.get('/pdf-wysiwyg/forms(/:form)?', (req: Request, res: Response) => {
  const reqbody = req.body || {},
        params = req.params || {},
        form = params.form || '',
        source = fetchSource(req, req.app.locals.sources);

  source.pdf_wysiwyg.schema.getForms(source.pdf_wysiwyg, form).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).send(err.message);
    debug('Error: %s', JSON.stringify(err));
  });
});

router.get('/pdf-wysiwyg/data/:data/version/:version', (req: Request, res: Response) => {
  const reqbody = req.body || {},
        params = req.params || {},
        data_id = params.data || '',
        version = params.version || '',
        source = fetchSource(req, req.app.locals.sources);

  source.pdf_wysiwyg.schema.getData(source.pdf_wysiwyg, data_id, version).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).send(err.message);
    debug('Error: %s', JSON.stringify(err));
  });
});

router.get('/pdf-wysiwyg/data/:data', (req: Request, res: Response) => {
  const reqbody = req.body || {},
        params = req.params || {},
        data_id = params.data || '',
        source = fetchSource(req, req.app.locals.sources);

  source.pdf_wysiwyg.schema.getData(source.pdf_wysiwyg, data_id).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).send(err.message);
    debug('Error: %s', JSON.stringify(err));
  });
});

router.post('/pdf-wysiwyg/forms/:form/versions/:version/:action', (req: Request, res: Response) => {
  const reqbody = req.body || {},
        params = req.params || {},
        form = params.form || '',
        version = params.version || '',
        action = params.action || '',
        data = reqbody.data.data || '',
        data_id = reqbody.data.data_id || '',
        source = fetchSource(req, req.app.locals.sources),
        saveMethod = source.pdf_wysiwyg.saveMethod || 'overwrite';

  if (action === 'setActive') {
    source.pdf_wysiwyg.schema.setActive(source.pdf_wysiwyg, form, version).then(resp => {
      res.status(200).json(resp);
    }).catch(err => {
      res.status(500).send(err.message);
      debug('Error: %s', JSON.stringify(err));
    });
  } else if (action === 'removeVersion') {
    source.pdf_wysiwyg.schema.removeVersion(source.pdf_wysiwyg, form, version).then(resp => {
      res.status(200).json(resp);
    }).catch(err => {
      res.status(500).send(err.message);
      debug('Error: %s', JSON.stringify(err));
    });
  } else if (action === 'deactivateVersion') {
    source.pdf_wysiwyg.schema.deactivateVersion(source.pdf_wysiwyg, form, version).then(resp => {
      res.status(200).json(resp);
    }).catch(err => {
      res.status(500).send(err.message);
      debug('Error: %s', JSON.stringify(err));
    });
  } else if (action === 'saveInput') {
    source.pdf_wysiwyg.schema.saveInputData(source.pdf_wysiwyg, version, data, data_id, saveMethod).then(resp => {
      res.status(200).json(resp);
    }).catch(err => {
      res.status(500).send(err.message);
      debug('Error: %s', JSON.stringify(err));
    });
  }
});

router.post('/pdf-wysiwyg/forms/:form/versions(/:version)?', (req: Request, res: Response) => {
  const reqbody = req.body || {},
        params = req.params || {},
        form = params.form || '',
        version = params.version || '',
        source = fetchSource(req, req.app.locals.sources);

  source.pdf_wysiwyg.schema.exportForms(source.pdf_wysiwyg, reqbody, form, version).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).send(err.message);
    debug('Error: %s', JSON.stringify(err));
  });
});

export = router;
