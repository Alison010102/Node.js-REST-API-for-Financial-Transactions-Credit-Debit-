import { test, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
import request from 'supertest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('user can create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: ' New Transaction',
        amount: 5000,
        type: 'credito',
      })
      .expect(201)
  })
  test('should be able to list all transections', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credito',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponde = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies || [])
      .expect(200)

    expect(listTransactionsResponde.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      }),
    ])
  })
  test('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credito',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponde = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies || [])
      .expect(200)

    const transactionId = listTransactionsResponde.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies || [])
      .expect(200)
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      })
    )
  })
  test('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit Transaction',
        amount: 5000,
        type: 'credito',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies || [])
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debito',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies || [])
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
